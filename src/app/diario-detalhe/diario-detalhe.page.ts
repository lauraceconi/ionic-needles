import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiarioService } from '../services/diario.service';
import { ModalController } from '@ionic/angular';
import { ModalLocalComponent } from '../modal-local/modal-local.component';

@Component({
  selector: 'app-diario-detalhe',
  templateUrl: './diario-detalhe.page.html',
  styleUrls: ['./diario-detalhe.page.scss'],
})
export class DiarioDetalhePage implements OnInit {

  constructor(
    public service: DiarioService,
    public route: ActivatedRoute,
    private modalCtrl: ModalController,
    public router: Router
  ) { }

  public diario_id: string;
  public diario: any;

  ngOnInit() {
    this.diario_id = this.route.snapshot.paramMap.get('id');
    this.getDetalhesDiario();
  }

  public getDetalhesDiario() {
    this.service.getDetalhesDiario(this.diario_id).then(response => {
      this.diario = response;
    });
  }

  public acessarLocal(id) {
    this.router.navigate(['/local', id]);
  }

  public async abrirModalLocal() {
    const modal = await this.modalCtrl.create({
      component: ModalLocalComponent,
      componentProps: { diario_id: this.diario_id }
    });
    modal.onDidDismiss().then(() => {
      this.getDetalhesDiario();
    });
    return await modal.present();
  }


}
