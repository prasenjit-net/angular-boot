import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = 'user';
  password: string = 'user';
  remembered: boolean;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('');
    }
  }

  login() {
    this.auth.login(this.userName, this.password, this.remembered);
    let route = sessionStorage.getItem('nextRoute');
    if (route) {
      this.router.navigateByUrl(route);
    } else {
      this.router.navigateByUrl('');
    }
  }
}
