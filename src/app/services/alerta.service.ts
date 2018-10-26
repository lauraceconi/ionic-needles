import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Injectable({
  providedIn: 'root'
})

export class AlertaService {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  async mostrarModal(tipo: string, icone: string, titulo: string, mensagem: string, redirecionar: boolean = false) {
    const modal = await this.modalCtrl.create({
      component: ModalAlertaComponent,
      cssClass: 'alert-popup',
      componentProps: {
        'tipo': tipo,
        'icone': icone,
        'titulo': titulo,
        'mensagem': mensagem,
        'redirecionar': redirecionar
      }
    });
    return await modal.present();
  }
}
