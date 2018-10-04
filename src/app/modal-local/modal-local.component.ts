import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DiarioService } from '../services/diario.service';

@Component({
  selector: 'app-modal-local',
  templateUrl: './modal-local.component.html',
  styleUrls: ['./modal-local.component.scss']
})
export class ModalLocalComponent implements OnInit {

  constructor(public service: DiarioService,
              public modalCtrl: ModalController) { }

  @Input('diario_id') diario_id : string;
  public local: any = {};

  ngOnInit() {
  }

  public fecharModal() {
    this.modalCtrl.dismiss();
  }  

  public adicionarLocal() {
    this.service.adicionarLocal(this.diario_id, this.local).then(response => {
      this.fecharModal();
    })
  }

}
