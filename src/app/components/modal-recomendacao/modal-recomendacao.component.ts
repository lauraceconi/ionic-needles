import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../services/grupo.service';
import { ModalController } from '@ionic/angular';
import { RecomendacoesService } from '../../services/recomendacoes.service';

@Component({
  selector: 'app-modal-recomendacao',
  templateUrl: './modal-recomendacao.component.html',
  styleUrls: ['./modal-recomendacao.component.scss']
})
export class ModalRecomendacaoComponent implements OnInit {

  constructor(
    public grupoService: GrupoService,
    public modalCtrl: ModalController,
    public recomendacoesService: RecomendacoesService
  ) { }

  public recomendacao: any = { 'grupos': [] };
  public compartilhamento: any = [];
  public erros: any = {};
  public grupos: any;

  ngOnInit() {
    this.getGrupos();
  }

  public fecharModal() {
    this.modalCtrl.dismiss();
  }

  public getGrupos() {
    this.grupoService.getGrupos().then(response => {
      this.grupos = response;
    });
  }

  public removeErro(campo) {
    const mensagemCampo = this.erros[campo];
    if (mensagemCampo) { delete this.erros[campo]; }
  }

  public criarRecomendacao() {
    const index_seguidores = this.compartilhamento.indexOf('seguidores');
    if (this.compartilhamento.indexOf('seguidores') > -1) {
      this.compartilhamento.splice(index_seguidores, 1);
      this.recomendacao['seguidores'] = true;
    } else {
      this.recomendacao['seguidores'] = false;
    }

    for (let i = 0; i < this.compartilhamento.length; i++) {
      (this.recomendacao['grupos']).push(parseInt(this.compartilhamento[i]));
    }

    this.recomendacoesService.criarRecomendacao(this.recomendacao).then(response => {
      if (response['status'] == 400) {
        const chaves = Object.keys(response['error']);
        for (let i in chaves) {
          this.erros[chaves[i]] = response['error'][chaves[i]];
        }
      } else {
        this.fecharModal();
      }
    });
  }

}
