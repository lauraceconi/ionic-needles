import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SETTINGS } from '../../app/settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

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
}