import { Component, OnInit } from '@angular/core';
import { RecomendacoesService } from '../../services/recomendacoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DiarioService } from '../../services/diario.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-recomendacao-detalhe',
  templateUrl: './recomendacao-detalhe.page.html',
  styleUrls: ['./recomendacao-detalhe.page.scss'],
})
export class RecomendacaoDetalhePage implements OnInit {

  constructor(
    public service: RecomendacoesService,
    public diarioService: DiarioService,
    public route: ActivatedRoute,
    private modalCtrl: ModalController,
    public router: Router,
    public storage: Storage
  ) { }

  public recomendacao_id: string;
  public recomendacao: any = {};
  public meus_diarios: any = {};
  public diarios = [];
  public dados: any = {};
  public recomendacaoUsuario: boolean;

  ngOnInit() {
    this.recomendacao_id = this.route.snapshot.paramMap.get('id');
    this.getDetalhesRecomendacao();
    this.recomendacaoUsuario = false;
  }

  public getDetalhesRecomendacao() {
    this.storage.get('dadosUsuario').then(dados => {
      this.dados = JSON.parse(dados);
      this.service.getDetalhesRecomendacao(this.recomendacao_id).then(response => {
        this.recomendacao = response;
        if (this.recomendacao.autor.id == this.dados.id) { this.recomendacaoUsuario = true; }
        this.diarioService.getDiarios().then(response2 => {
          this.meus_diarios = response2;
        });
      });
    });
  }

  public acessarGrupo(e, id) {
    e.preventDefault();
    this.router.navigate(['/grupos', id]);
  }

  public acessarDiario(e, id) {
    e.preventDefault();
    this.router.navigate(['/diarios', id]);
  }

  public sugerirDiarios() {
    const dados = { 'diarios': [] };
    for (let i = 0; i < this.diarios.length; i++) {
      (dados['diarios']).push(parseInt(this.diarios[i]));
    }
    dados['id'] = parseInt(this.recomendacao_id);

    this.service.sugerirDiarios(dados).then(response => {
      this.getDetalhesRecomendacao();
    });
  }

}
