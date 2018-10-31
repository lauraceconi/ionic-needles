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

  ngOnInit() {
    this.carregarDiarios();
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
}
