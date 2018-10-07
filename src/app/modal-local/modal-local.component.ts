import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController, Platform, LoadingController } from '@ionic/angular';
import { DiarioService } from '../services/diario.service';

@Component({
  selector: 'app-modal-local',
  templateUrl: './modal-local.component.html',
  styleUrls: ['./modal-local.component.scss']
})
export class ModalLocalComponent implements OnInit {

  constructor(public service: DiarioService,
              public modalCtrl: ModalController,
              ) { }

  @Input('diario_id') diario_id : string;
  public local: any = {};
  lat: number = 51.678418;
  lng: number = 7.809007;

  ngOnInit() {
  }

  public fecharModal() {
    this.modalCtrl.dismiss();
  }  

  public adicionarLocal() {
    this.service.adicionarLocal(this.diario_id, this.local).then(response => {
      this.fecharModal();
    });
  }

  public uploadArquivo(event) {
    this.local.foto = event.target.files[0]
  }

}
