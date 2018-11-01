import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
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
    private service: LoginService,
    private events: Events
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
      title: ' Solicitar Recomendações',
      url: '/recomendacoes',
      icon: 'megaphone'
    },
    {
      title: 'Grupos',
      url: '/grupos',
      icon: 'people'
    }
  ];

  public dados: any = {};
  public player_id: string;
  public OneSignal = window['OneSignal'] || [];

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const OneSignal = window['OneSignal'] || [];
      const _this = this;
      console.log('Init OneSignal');
      OneSignal.push(['init', {
        appId: '9929500d-6547-454b-92eb-39bdbb05fa82',
        autoRegister: false,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: false
        },
        promptOptions: {
          actionMessage: 'Você gostaria de receber notificações de Wanderlust?',
          acceptButtonText: 'Sim!',
          cancelButtonText: 'Agora não'
        },
        welcomeNotification: {
          'title': 'Seja bem-vindo!',
          'message': 'Estamos prontos para te enviar novidades!'
        }
      }]);
      console.log('OneSignal Initialized');
      OneSignal.push(function () {
        // Occurs when the user's subscription changes to a new value.
        OneSignal.on('subscriptionChange', function (isSubscribed) {
          console.log('The user subscription state is now:', isSubscribed);
          OneSignal.getUserId().then(function (userId) {
            _this.service.cadastraNotificacao(userId);
          });
        });
      });

      this.events.subscribe('loginEfetuado', () => {
        OneSignal.push(function() {
          OneSignal.showHttpPrompt();
        });
        this.storage.get('dadosUsuario').then(dados => {
          if (dados) {
            this.dados = JSON.parse(dados);
          } else {
            this.service.getDadosUsuarioLogado().then(response => {
              this.storage.set('dadosUsuario', JSON.stringify(response));
              this.dados = response;
            });
          }
        });
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
