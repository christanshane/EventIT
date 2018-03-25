import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { CanActivate, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService implements CanActivate{
  user:Observable<firebase.User>; 
  firebaseUser: Observable<User | null>;
  error:any;
  authState:any = null;

  constructor(private afauth: AngularFireAuth,private router:Router, private afs: AngularFirestore) {
    this.user = afauth.authState; 

    this.afauth.authState.subscribe((auth) =>{
      this.authState = auth;
    });

    this.firebaseUser = this.afauth.authState
      .switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
  });
  }

  updateUserData(user: User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`); 

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL ||  'https://goo.gl/Fz9nrQ',
    };

    return userRef.set(data);
  }

  signOut(){
    this.afauth.auth.signOut().then(value=>{
      console.log('You have logged out', value);
      this.router.navigate(['/']); 
    });
}

  canActivate(): Observable<boolean>{
    return Observable.from(this.afauth.authState)
    .take(1)
    .map(state => !!state)
    .do(authenticated => {
      if
      (!authenticated) this.router.navigate(['/login']);
    })
}
}
