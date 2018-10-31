import { Injectable } from '@angular/core';
import { SETTINGS } from '../settings';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private api: ApiService) { }

  public getGrupos() {
    const url = SETTINGS.API_URL + 'grupos/';
    return this.api.get(url);
  }

  public getGrupo(id) {
    const url = SETTINGS.API_URL + 'grupos/' + id + '/';
    return this.api.get(url);
  }

  public criarGrupo(dados) {
    const url = SETTINGS.API_URL + 'grupos/';
    return this.api.postJSON(url, dados);
  }
}
