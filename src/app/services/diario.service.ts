import { Injectable } from '@angular/core';
import { SETTINGS } from '../settings';
import { ApiService } from './api.service';

@Injectable()
export class DiarioService {

  constructor(private api: ApiService) { }

  public getDiarios() {
    const url = SETTINGS.API_URL + 'diarios/';
    return this.api.get(url);
  }

  public getDetalhesDiario(diario_id: string) {
    const url = SETTINGS.API_URL + 'diarios/' + diario_id +'/';
    return this.api.get(url);
  }

  public getDetalhesLocal(local_id: string) {
    const url = SETTINGS.API_URL + 'locais/' + local_id +'/';
    return this.api.get(url);
  }

  public criarDiario(titulo: string) {
    const url = SETTINGS.API_URL + 'diarios/';
    const formData = new FormData();
    formData.append('titulo', titulo);
    return this.api.post(url, formData);
  }

  public adicionarLocal(diario_id: string, dados: object) {
    const url = SETTINGS.API_URL + 'diarios/' + diario_id +'/cria-local/';
    const formData = new FormData();
    for (const key in dados) {
      formData.append(key, dados[key]);
    }
    return this.api.post(url, formData);
  }
}
