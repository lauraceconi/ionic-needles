import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SETTINGS } from '../../app/settings';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private storage: Storage,
              private events: Events,
              private api: ApiService) { }

  public login(dados: object) {
    const url = SETTINGS.SERVIDOR + 'api-token-auth/';
    const formData = new FormData();
    for (const key in dados) {
      formData.append(key, dados[key]);
    }
    return this.api.post(url, formData);
  }

  public cadastro(dados: object) {
    const url = SETTINGS.API_URL + 'cadastro/';
    const formData = new FormData();
    for (const key in dados) {
      formData.append(key, dados[key]);
    }
    return this.api.post(url, formData);
  }

  public getDadosUsuarioLogado() {
    const url = SETTINGS.API_URL + 'dados-usuario/';
    return this.api.get(url);
  }

  public getDadosUsuario(id: string) {
    const url = SETTINGS.API_URL + 'perfil/' + id + '/';
    return this.api.get(url);
  }

  public getUsuarios() {
    const url = SETTINGS.API_URL + 'usuarios/';
    return this.api.get(url);
  }

  public getToken() {
    return this.storage.get('token');
  }

  public cadastraNotificacao(userId) {
    const url = SETTINGS.API_URL + 'notificacoes/';
    const formData = new FormData();
    formData.append('user_id', userId);
    return this.api.post(url, formData);
  }

  public sendLogoutEvent(): void {
    this.storage.clear().then(
      data => {
        this.events.publish('logout');
      }
    );
  }
}