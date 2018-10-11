import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { SETTINGS } from './settings';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private service: LoginService
  ) {
    this.initializeApp();
  }

  public appPages = [
    {
      title: 'Feed',
      url: '/feed',
      icon: 'book'
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'Diários de Viagem',
      url: '/diarios',
      icon: 'paper'
    },
    {
      title: 'Recomendações',
      url: '/recomendacoes',
      icon: 'megaphone'
    },
    {
      title: 'Grupos',
      url: '/grupos',
      icon: 'people'
    }
  ];

  public dados: object = {};

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get('dadosUsuario').then(dados => {
        if (dados) {
          this.dados = dados;
        } else {
          this.service.getDadosUsuario().then(response => {
            this.storage.set('dadosUsuario', JSON.stringify(response));
            this.dados = response;
          });
        }
      });
    });
  }

  public logout() {
    this.storage.clear().then(() => {
      this.router.navigateByUrl('');
    });
  }

  public isActive(url) {
    return window.location.href.indexOf(url) > 0;
  }
}
