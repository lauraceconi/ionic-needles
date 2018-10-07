import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../services/grupo.service';
import { ModalController } from '@ionic/angular';
import { ModalGrupoComponent } from '../modal-grupo/modal-grupo.component';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  constructor(public service: GrupoService,
              private modalCtrl: ModalController,) { }

  public grupos: object;

  ngOnInit() {
    this.getGrupos();
  }

  public getGrupos() {
    this.service.getGrupos().then(response => {
      this.grupos = response;
    });
  }

  public async abrirModalGrupo() {
    const modal = await this.modalCtrl.create({
      component: ModalGrupoComponent
    });
    modal.onDidDismiss().then(() => {
      this.getGrupos();
    });
    return await modal.present();    
  }

}
