import { Component, OnInit } from '@angular/core';

import { GrupoService } from '../../services/grupo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-grupo-detalhe',
  templateUrl: './grupo-detalhe.page.html',
  styleUrls: ['./grupo-detalhe.page.scss'],
})
export class GrupoDetalhePage implements OnInit {

  constructor(
    public service: GrupoService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  public grupo_id: string;
  public grupo: any = {};

  ngOnInit() {
    this.grupo_id = this.route.snapshot.paramMap.get('id');
    this.getDetalhesRecomendacao();
  }

  public getDetalhesRecomendacao() {
    this.service.getGrupo(this.grupo_id).then(response => {
      this.grupo = response;
    });
  }

  public acessarRecomendacao(e, id) {
    e.preventDefault();
    this.router.navigate(['/recomendacoes', id]);
  }

}
