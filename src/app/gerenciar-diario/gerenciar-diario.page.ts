import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiarioService } from '../services/diario.service';

@Component({
  selector: 'app-gerenciar-diario',
  templateUrl: './gerenciar-diario.page.html',
  styleUrls: ['./gerenciar-diario.page.scss'],
})
export class GerenciarDiarioPage implements OnInit {

  public titulo : string;

  constructor(public service: DiarioService,
              public router: Router) { }

  ngOnInit() {
  }

  public criarDiario() {
    this.service.criarDiario(this.titulo)
    /*.then(response  => {
      this.router.navigateByUrl('/diario');
    });*/
  }

}
