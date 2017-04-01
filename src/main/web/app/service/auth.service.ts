import {User} from "./../class/user";
import {Injectable, Output, EventEmitter} from "@angular/core";
import {HttpService} from "./http.service";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class AuthService {

  @Output()
  public userUpdated = new EventEmitter<User>();
  session: string;

  constructor(private _http: HttpService) {
    this.userUpdated.emit(this.getUser());
  }

  login(userName: string, password: string, remembered: boolean = false) {
    let user: User;
    this._http.token = 'Basic ' + btoa(userName + ':' + password);
    return this._http.get('/user')
      .map(res => {
        user = res.json();
        let data = JSON.stringify(user);
        this.setUserData(data, remembered);
        this.userUpdated.emit(user);
        return user;
      });
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    return this._http.post('/logout', {})
      .subscribe(d => this.userUpdated.emit(null));
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
