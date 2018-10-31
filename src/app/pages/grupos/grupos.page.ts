import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../services/grupo.service';
import { ModalController } from '@ionic/angular';
import { ModalGrupoComponent } from '../../components/modal-grupo/modal-grupo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  constructor(
    public service: GrupoService,
    public router: Router,
    private modalCtrl: ModalController,
  ) { }

  public grupos: any;

  ngOnInit() {
    this.getGrupos();
  }

  public getGrupos() {
    this.service.getGrupos().then(response => {
      this.grupos = response;
    });
  }

  public acessarGrupo(id) {
    this.router.navigate(['/grupos', id]);
  }

  public async abrirModalGrupo(id_grupo = null) {
    const modal = await this.modalCtrl.create({
      component: ModalGrupoComponent,
      componentProps: { id_grupo: id_grupo }
    });
    modal.onDidDismiss().then(() => {
      this.getGrupos();
    });
    return await modal.present();
  }

}
