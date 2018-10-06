import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiarioService } from '../services/diario.service';

@Component({
  selector: 'app-local-detalhe',
  templateUrl: './local-detalhe.page.html',
  styleUrls: ['./local-detalhe.page.scss'],
})
export class LocalDetalhePage implements OnInit {

  constructor(public service: DiarioService,
              public route: ActivatedRoute,) { }

  public local_id: string;
  public local: object;

  ngOnInit() {
    this.local_id = this.route.snapshot.paramMap.get('id');
    this.getDetalhesLocal();
  }

  public getDetalhesLocal() {
    this.service.getDetalhesLocal(this.local_id).then(response => {
      this.local = response;
    })
  }

}
