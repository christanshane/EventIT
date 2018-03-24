import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  error:any;
  constructor(public auth: AuthService, private router: Router) { }

  show = false;

  toggleCollapse() {
    this.show = !this.show;
  }
  
  ngOnInit() {
  }

  logout(){
    this.auth.signOut();
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

}
