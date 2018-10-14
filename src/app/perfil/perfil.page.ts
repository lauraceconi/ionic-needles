import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    public loginService: LoginService,
    public perfilService: PerfilService
    public storage: Storage,
    public route: ActivatedRoute,
    public alertController: AlertController,
  ) { }

  public dados: object = {};
  public perfilUsuario: boolean;

  ngOnInit() {
    this.carregaDados();
  }

  public carregaDados() {
    let usuario_id = this.route.snapshot.paramMap.get('id');
    if (usuario_id) {
      this.perfilUsuario = false;
      this.getDadosUsuario(usuario_id);
    } else {
      this.getDadosUsuarioLogado();
      this.perfilUsuario = true;
    }
  }

  public getDadosUsuarioLogado() {
    this.storage.get('dadosUsuario').then(dados => {
      this.dados = JSON.parse(dados);
    });
  }

  public getDadosUsuario(usuario_id: string) {
    this.loginService.getDadosUsuario(usuario_id).then(dados => {
      this.dados = dados;
    });
  }

  async setClassificacao() {
    const alert = await this.alertController.create({
      header: 'Classifique esta pessoa',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Amigo',
          value: '1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Conhecido',
          value: '2'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Não conheço',
          value: '3'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Inimigo',
          value: '4'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Seguir',
          handler: (data) => {
            this.perfilService.seguirUsuario(this.dados.id, data).then(response => {
              debugger
              this.carregaDados();
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
