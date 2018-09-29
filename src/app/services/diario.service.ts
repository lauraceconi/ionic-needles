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

  public getDetalhesDiario(id: string) {
    let url = SETTINGS.API_URL + 'diarios/' + id +'/';
    return this.api.get(url);
  }
  
}
