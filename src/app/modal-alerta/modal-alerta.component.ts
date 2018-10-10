import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html'
})
export class ModalAlertaComponent implements OnInit {

  @Input('tipo') tipo : string;
  @Input('icone') icone : string;
  @Input('titulo') titulo : string;
  @Input('mensagem') mensagem : string;
  @Input('redirecionar') redirecionar : boolean;

  constructor(public modalCtrl: ModalController,
              public router: Router,) { }

  ngOnInit() {
  }

  public fecharModal() {    
    this.modalCtrl.dismiss();
    if (this.redirecionar) this.router.navigateByUrl('');
  }  

}
