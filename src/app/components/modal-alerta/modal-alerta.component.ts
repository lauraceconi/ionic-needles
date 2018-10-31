import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html'
})
export class ModalAlertaComponent implements OnInit {

  @Input('tipo') tipo: string;
  @Input('icone') icone: string;
  @Input('titulo') titulo: string;
  @Input('mensagem') mensagem: string;
  @Input('redirecionar') redirecionar: boolean;

  constructor(
    public modalCtrl: ModalController,
    public events: Events
  ) { }

  ngOnInit() {
  }

  public fecharModal() {
    this.modalCtrl.dismiss();
    if (this.redirecionar) { this.events.publish('realizarLogout'); }
  }

}
