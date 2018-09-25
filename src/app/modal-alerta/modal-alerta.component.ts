import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrls: ['./modal-alerta.component.scss']
})
export class ModalAlertaComponent implements OnInit {

  @Input('tipoErro') tipoErro : string;
  @Input('redirecionar') redirecionar : string;

  constructor() { }

  ngOnInit() {
  }

}
