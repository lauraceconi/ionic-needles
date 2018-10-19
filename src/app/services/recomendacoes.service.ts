import { Injectable } from '@angular/core';
import { SETTINGS } from '../settings';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecomendacoesService {

  constructor(private api: ApiService) { }

  public getRecomendacoes() {
    const url = SETTINGS.API_URL + 'recomendacoes/';
    return this.api.get(url);
  }

  public getDetalhesRecomendacao(diario_id: string) {
    const url = SETTINGS.API_URL + 'recomendacoes/' + diario_id + '/';
    return this.api.get(url);
  }

  public criarRecomendacao(descricao: string) {
    const url = SETTINGS.API_URL + 'recomendacoes/';
    const formData = new FormData();
    formData.append('descricao', descricao);
    return this.api.post(url, formData);
  }
}
