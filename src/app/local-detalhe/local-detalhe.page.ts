import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-local-detalhe',
  templateUrl: './local-detalhe.page.html',
  styleUrls: ['./local-detalhe.page.scss'],
})
export class LocalDetalhePage implements OnInit {

  constructor(public route: ActivatedRoute,) { }

  public local_id: string;

  ngOnInit() {
    this.local_id = this.route.snapshot.paramMap.get('id');
    this.getDetalhesDiario();
  }

}
