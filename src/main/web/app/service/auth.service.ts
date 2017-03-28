import { User } from './../class/user';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class AuthService {

  @Output()
  public userUpdated = new EventEmitter<User>();

  constructor() {
    this.userUpdated.emit(this.getUser());
  }

  login(userName: string, password: string, remembered: boolean = false) {
    let user = new User();
    user.name = userName;
    let data = JSON.stringify(user);
    this.setUserData(data, remembered);
    this.userUpdated.emit(user);
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    this.userUpdated.emit(null);
  }

  isLoggedIn() {
    return this.getUser() != null;
  }

  getUser() {
    let data = this.getUserData();
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("failed to restore remembered user");
      }
    }
    return null;
  }

  private getUserData() {
    let data = sessionStorage.getItem('currentUser');
    if (!data) {
      data = localStorage.getItem('currentUser');
      if (data) {
        sessionStorage.setItem('currentUser', data);
      }
    }
    return data;
  }

  private setUserData(data: string, remembered: boolean = false) {
    if (remembered) {
      localStorage.setItem('currentUser', data);
    }
    sessionStorage.setItem('currentUser', data);
  }

}
