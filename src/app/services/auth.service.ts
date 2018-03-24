import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { CanActivate, Router } from '@angular/router';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthService implements CanActivate{
  user:Observable<firebase.User>; 
  error:any;

  constructor(private afauth: AngularFireAuth,private router:Router) {
    this.user = afauth.authState; 
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
