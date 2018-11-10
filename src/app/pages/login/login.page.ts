import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController, Events } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  constructor(
    public menuCtrl: MenuController,
    public service: LoginService,
    public storage: Storage,
    public router: Router,
    private events: Events
  ) { }

  public dados_login: object = {};
  public dados_cadastro: object = {};
  public abaAtiva: string;
  public erros: any = {};

  ionViewWillEnter() {
    this.storage.get('token').then(token => {
      if (token) {
        this.router.navigateByUrl('/feed');
        this.events.publish('loginEfetuado');
      }
    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
    document.getElementById('menu').style.display = 'none';
    this.abaAtiva = 'cadastro';
  }

  public trocarAba(event, aba) {
    event.preventDefault();
    this.abaAtiva = aba;
  }

  public login() {
    const dados = {};
    for (let key in this.dados_login) {
      dados[key] = this.dados_login[key];
    }
    this.service.login(dados).then(
      response => {
        this.storage.set('token', response['token']);
        this.events.publish('loginEfetuado');
        this.router.navigateByUrl('/feed');
    });
  }

  public cadastro() {
    const dados = {};
    for (let key in this.dados_cadastro) {
      dados[key] = this.dados_cadastro[key];
    }
    this.service.cadastro(dados).then((response) => {
      if (response['status'] == 400 || response['status'] == 500) {
        const chaves = Object.keys(response['error']);
        for (let i in chaves) {
          this.erros[chaves[i]] = response['error'][chaves[i]];
        }
      } else {
        this.dados_login['username'] = this.dados_cadastro['email'];
        this.dados_login['password'] = this.dados_cadastro['password'];
        this.login();
      }
    });
  }

  public removeErro(campo) {
    const mensagemCampo = this.erros[campo];
    if (mensagemCampo) { delete this.erros[campo]; }
  }
}
