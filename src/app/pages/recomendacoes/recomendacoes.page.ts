import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RecomendacoesService } from '../../services/recomendacoes.service';
import { ModalRecomendacaoComponent } from '../../components/modal-recomendacao/modal-recomendacao.component';

@Component({
  selector: 'app-recomendacoes',
  templateUrl: './recomendacoes.page.html',
  styleUrls: ['./recomendacoes.page.scss'],
})
export class RecomendacoesPage implements OnInit {

  constructor(
    public service: RecomendacoesService,
    public modalCtrl: ModalController,
    public router: Router
  ) { }

  public recomendacoes: any;

  ngOnInit() {
    this.getRecomendacoes();
  }

  public getRecomendacoes() {
    this.service.getRecomendacoes().then(response  => {
      this.recomendacoes = response;
    });
  }

  public acessarRecomendacao(id) {
    this.router.navigate(['/recomendacoes', id]);
  }

  async criarNovaRecomendacao() {
    const modal = await this.modalCtrl.create({
      component: ModalRecomendacaoComponent
    });
    modal.onDidDismiss().then(() => {
      this.getRecomendacoes();
    });
    return await modal.present();
  }
}
