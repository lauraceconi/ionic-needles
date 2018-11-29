import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DiarioService } from '../../services/diario.service';

@Component({
  selector: 'app-diarios',
  templateUrl: './diarios.page.html',
  styleUrls: ['./diarios.page.scss']
})
export class DiariosPage implements OnInit {

  constructor(
    public service: DiarioService,
    public alertController: AlertController,
    public router: Router
  ) { }

  public diarios: any;
  public onLine: boolean;

  ngOnInit() {
    this.carregarDiarios();

    if (navigator.onLine) {
      this.onLine = true;
    } else {
      this.onLine = false;
    }
  }

  public carregarDiarios() {
    this.service.getDiarios().then(response  => {
      this.diarios = response;
    });
  }

  public acessarDiario(id) {
    this.router.navigate(['/diarios', id]);
  }

  async criarNovoDiario() {
    const alert = await this.alertController.create({
      header: 'Novo Diário',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Dê um título ao seu Diário'
        }
      ],
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Criar',
          handler: data => {
            this.service.criarDiario(data.titulo).then(response  => {
              this.carregarDiarios();
              this.router.navigate(['/diarios', response['id']]);
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async compartilhar() {
    const alert = await this.alertController.create({
      header: 'Compartilhar com:',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Seguidores',
          value: 'value1',
          checked: true
        },

        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Grupo do vôlei',
          value: 'value2'
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
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
