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
    const formData = new FormData();
    formData.append('classificacao_id', classificacao_id);
    return this.api.post(url, formData);
  }
}
