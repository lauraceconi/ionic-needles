import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.scss']
})
export class ModalPerfilComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    public storage: Storage
  ) { }

  @Input('dados') dados : any;
  //public dados: any;

  ngOnInit() {
    //this.getDadosUsuarioLogado();
  }

  public fecharModal() {
    this.modalCtrl.dismiss();
  }

  public getDadosUsuarioLogado() {
    this.storage.get('dadosUsuario').then(dados => {
      this.dados = JSON.parse(dados);
    });
  }

  public uploadFoto(event) {
    this.dados.foto = event.target.files[0];
  }

}
