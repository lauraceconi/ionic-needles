import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

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
  public seguirUsuario(id: string, classificacao_id: string) {
    let url = SETTINGS.API_URL + 'relacionamentos/' + id + 'seguir/';
    let formData = new FormData();
    formData.append('classificacao_id', classificacao_id);
    return this.api.post(url, formData);
  }

}
