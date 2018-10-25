import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RecomendacoesService } from '../services/recomendacoes.service';

@Component({
  selector: 'app-recomendacoes',
  templateUrl: './recomendacoes.page.html',
  styleUrls: ['./recomendacoes.page.scss'],
})
export class RecomendacoesPage implements OnInit {

  constructor(
    public service: RecomendacoesService,
    public alertController: AlertController,
    public router: Router
  ) { }

  public recomendacoes: any;

  ngOnInit() {
    this.carregarRecomendacoes();
  }

  public carregarRecomendacoes() {
    this.service.getRecomendacoes().then(response  => {
      this.recomendacoes = response;
    });
  }

  public acessarRecomendacao(id) {
    this.router.navigate(['/recomendacoes', id]);
  }

  async criarNovaRecomendacao() {
    const alert = await this.alertController.create({
      header: 'Nova solicitação de recomendação',
      inputs: [
        {
          name: 'descricao',
          type: 'text',
          placeholder: 'Descreva sua solicitação'
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
            this.service.criarRecomendacao(data.descricao).then(response  => {
              this.router.navigate(['/recomendacoes', response['id']]);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
