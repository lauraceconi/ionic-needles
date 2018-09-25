import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { SETTINGS } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Feed',
      url: '/feed',
      icon: 'home'
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
      url: '/diarios-de-viagem',
      icon: 'people'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
