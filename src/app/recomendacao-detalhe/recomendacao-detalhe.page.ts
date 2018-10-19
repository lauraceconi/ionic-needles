import { Component, OnInit } from '@angular/core';
import { RecomendacoesService } from '../services/recomendacoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recomendacao-detalhe',
  templateUrl: './recomendacao-detalhe.page.html',
  styleUrls: ['./recomendacao-detalhe.page.scss'],
})
export class RecomendacaoDetalhePage implements OnInit {

  constructor(
    public service: RecomendacoesService,
    public route: ActivatedRoute,
    private modalCtrl: ModalController,
    public router: Router
  ) { }

  public recomendacao_id: string;
  public recomendacao: object;

  ngOnInit() {
    this.recomendacao_id = this.route.snapshot.paramMap.get('id');
    this.getDetalhesRecomendacao();
  }

  public getDetalhesRecomendacao() {
    this.service.getDetalhesRecomendacao(this.recomendacao_id).then(response => {
      this.recomendacao = response;
    });
  }

  public acessarLocal(id) {
    this.router.navigate(['/local', id]);
  }

}
