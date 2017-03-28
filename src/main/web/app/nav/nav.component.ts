import { User } from './../class/user';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: User = new User();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.auth.userUpdated.subscribe(user => this.user = user);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
