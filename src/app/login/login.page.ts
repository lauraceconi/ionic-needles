import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoginService } from '../services/login.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public password_cadastro: string;
  public abaAtiva: string;

  constructor(public menuCtrl: MenuController, 
              public service: LoginService,
              public storage: Storage) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    document.getElementById('menu').style.display = 'none';
    this.abaAtiva = 'cadastro';
  }

  public trocarAba(aba) {
    this.abaAtiva = aba;
  }

  public login() {
    this.service.login(this.username, this.password).subscribe(
      response => {
        this.storage.set('token', response['token']);
    });
  }

  public cadastro() {
    this.service.cadastro(
      this.firstname, 
      this.lastname,
      this.email,
      this.password_cadastro).subscribe(
      response  => {
        this.service.login(this.email, this.password_cadastro).subscribe(
          response => {
            this.storage.set('token', response['token']);
          }
        )
    });
  }

}
