import { Injectable } from '@angular/core';
import { SETTINGS } from '../settings';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private api: ApiService) { }

  public getGrupos() {
    let url = SETTINGS.API_URL + 'grupos/';
    return this.api.get(url);
  }

  public criarGrupo(dados: object) {
    let url = SETTINGS.API_URL + 'grupos/';
    let formData = new FormData();
    for (let key in dados) {
      formData.append(key, dados[key]);
    }
    debugger
    return this.api.post(url, formData);
  }
}
