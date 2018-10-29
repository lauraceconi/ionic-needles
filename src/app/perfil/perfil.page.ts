import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { PerfilService } from '../services/perfil.service';
import { ModalPerfilComponent } from '../modal-perfil/modal-perfil.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    public loginService: LoginService,
    public perfilService: PerfilService,
    public storage: Storage,
    public route: ActivatedRoute,
    public alertController: AlertController,
    public modalCtrl: ModalController
  ) { }

  public dados: any = {};
  public perfilUsuario: boolean;

  ngOnInit() {
    this.carregaDados();
  }

  public carregaDados() {
    const usuario_id = this.route.snapshot.paramMap.get('id');
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
      this.getDadosUsuario(this.dados.id);
    });
  }

  public getDadosUsuario(usuario_id: string) {
    this.storage.get('dadosUsuario').then(response => {
      this.dados = JSON.parse(response);
      if (!((this.dados.id).toString() === usuario_id)) {
        this.loginService.getDadosUsuario(usuario_id).then(dados => {
          this.dados = dados;
        });
      } else {
        this.perfilUsuario = true;
      }
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
        }
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
            this.perfilService.gerenciarRelacionamento(this.dados['id'], data).then(() => {
              this.carregaDados();
            });
          }
        }
      ]
    });

    await alert.present();

  }

  public async abrirModalEdicao() {
    const modal = await this.modalCtrl.create({
      component: ModalPerfilComponent,
      componentProps: { dados: this.dados }
    });
    modal.onDidDismiss().then(() => {
      this.getDadosUsuarioLogado();
    });
    return await modal.present();
  }

}
