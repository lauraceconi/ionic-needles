import { Injectable } from '@angular/core';
import { SETTINGS } from '../settings';
import { ApiService } from './api.service';

@Injectable()
export class DiarioService {

  constructor(private api: ApiService) { }

  public criarDiario(titulo) {
    let url = 'diarios/';
    let formData = new FormData();
    formData.append('titulo', titulo);
    return this.api.post(url, formData, true);
  }
  
}
