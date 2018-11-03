import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SETTINGS } from '../settings';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    public api: ApiService
  ) { }

  /**
   * seguirUsuario
   */
  public gerenciarRelacionamento(id: string, classificacao_id: string) {
    const url = SETTINGS.API_URL + 'relacionamentos/' + id + '/seguir/';
    const dados = { 'classificacao_id': classificacao_id };
    return this.api.postJSON(url, dados);
  }

  public atualizarPerfil(dados, foto) {
    const url = SETTINGS.API_URL + 'perfil/' + dados.id + '/';
    dados['foto'] = foto;
    const formData = new FormData();
    for (const key in dados) {
      formData.append(key, dados[key]);
    }
    return this.api.patch(url, formData);
  }
}
