import { Injectable } from '@angular/core';
import { SETTINGS } from '../settings';
import { ApiService } from './api.service';

@Injectable()
export class DiarioService {

  constructor(private api: ApiService) { }

  public getDiarios() {
    let url = SETTINGS.API_URL + 'diarios/';
    return this.api.get(url);
  }

  public criarDiario(titulo: string) {
    let url = SETTINGS.API_URL + 'diarios/';
    let formData = new FormData();
    formData.append('titulo', titulo);
    return this.api.post(url, formData);
  }

  public getDetalhesDiario(diario_id: string) {
    let url = SETTINGS.API_URL + 'diarios/' + diario_id +'/';
    return this.api.get(url);
  }

  public adicionarLocal(diario_id: string, dados: object) {
    let url = SETTINGS.API_URL + 'diarios/' + diario_id +'/cria-local/';
    let formData = new FormData();
    for (let key in dados) {
      formData.append(key, dados[key]);
    }
    return this.api.post(url, formData);
  }
  
}
