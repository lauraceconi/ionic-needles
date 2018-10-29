import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../services/grupo.service';

@Component({
  selector: 'app-modal-recomendacao',
  templateUrl: './modal-recomendacao.component.html',
  styleUrls: ['./modal-recomendacao.component.scss']
})
export class ModalRecomendacaoComponent implements OnInit {

  constructor(
    public grupoService: GrupoService
  ) { }

  public recomendacao: any = {};
  public erros: any = {};
  public grupos: any;

  ngOnInit() {
    this.getGrupos();
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

}
