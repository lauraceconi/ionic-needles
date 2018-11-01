import { Injectable } from '@angular/core';
import { SETTINGS } from '../settings';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecomendacoesService {

  constructor(
    private api: ApiService
  ) { }

  public getRecomendacoes() {
    const url = SETTINGS.API_URL + 'recomendacoes/';
    return this.api.get(url);
  }

  public getDetalhesRecomendacao(diario_id: string) {
    const url = SETTINGS.API_URL + 'recomendacoes/' + diario_id + '/';
    return this.api.get(url);
  }

  public criarRecomendacao(dados: any) {
    const url = SETTINGS.API_URL + 'recomendacoes/';
    return this.api.postJSON(url, dados);
  }

  public sugerirDiarios(dados: any) {
    const url = SETTINGS.API_URL + 'recomendacoes/' + dados.id + '/sugerir-diario/';
    return this.api.postJSON(url, dados);
  }
}
