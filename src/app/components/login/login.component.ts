import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fadeInOut, fallIn } from 'angular-router-animations';
import * as firebase from 'firebase';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[fallIn()],
  host:{'[@fallIn]':''}
})
export class LoginComponent implements OnInit {
  error:any;

  constructor(public af: AngularFireAuth, private router: Router, public auth: AuthService) { 
    this.af.authState.subscribe(auth =>{
      if(auth){
        this.router.navigateByUrl('/');
      }
    });
  }

  loginFb(){
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider)       
    .then(
      (success) => {
        this.auth.updateUserData(success.user);
        this.router.navigate(['/']);
      }).catch(
        (err) => {
          this.error = err;
        })
  }

  loginGoogle(){
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider).then(
      (success) => {
        this.auth.updateUserData(success.user);
        this.router.navigate(['/']);
      }).catch(
        (err) => {
          this.error = err;
        })
  }

  loginTwitter(){
    this.af.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider).then(
      (success) =>{
        this.auth.updateUserData(success.user);
        this.router.navigate(['/']);
      }).catch(
        (err) =>{
          this.error = err;
        })
  }

  ngOnInit() {
  }

}
