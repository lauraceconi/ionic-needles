import { Injectable } from '@angular/core';
import { App, ModalController } from '@ionic/angular';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Injectable({
  providedIn: 'root'
})

export class AlertaService {

  constructor(
    private app: App,
    private modalCtrl: ModalController,
  ) { }

  async mostrarModal(tipoErro : string, redirecionar : boolean = false) {
    const modal = await this.modalCtrl.create({
      component: ModalAlertaComponent,
      componentProps: { 
        'tipoErro': tipoErro,
        'redirecionar': redirecionar 
      }
    });
    return await modal.present();
  }
}
