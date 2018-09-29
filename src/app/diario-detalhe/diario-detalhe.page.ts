import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiarioService } from '../services/diario.service';

@Component({
  selector: 'app-diario-detalhe',
  templateUrl: './diario-detalhe.page.html',
  styleUrls: ['./diario-detalhe.page.scss'],
})
export class DiarioDetalhePage implements OnInit {

  constructor(public service: DiarioService,
              public route: ActivatedRoute) { }

  public id: string;
  public diario: object;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDetalhesDiario();
  }

  public getDetalhesDiario() {
    this.service.getDetalhesDiario(this.id).then(response => {
      this.diario = response;
    })
  }

}
