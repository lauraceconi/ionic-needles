import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SETTINGS } from '../../app/settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private storage: Storage,
              private events: Events) { }

  public login(username, password) {
    let url = SETTINGS.SERVIDOR + 'api-token-auth/';
    return this.http.post(
      url,
      {'username': username,
       'password': password}
    );
  }

  public cadastro(firstname, lastname, email, password) {
    let url = SETTINGS.API_URL + 'cadastro/';
    return this.http.post(
      url,
      {'firstname': firstname,
       'lastname': lastname,
       'email': email,
       'password': password}
    );
  }

  public getToken() {
    return this.storage.get('token');
  }

  public sendLogoutEvent() : void {
    this.storage.clear().then(
      data => {
        this.events.publish('logout');
      }
    );
  }
}