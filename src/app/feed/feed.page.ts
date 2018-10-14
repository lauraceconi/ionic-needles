import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(
    public menuCtrl: MenuController,
    private service: LoginService,
    private storage: Storage,
    public router: Router
  ) { }

  public dados: object = {};
  public mostrarBarraPesquisa: boolean;
  public listaUsuarios: any = [];
  public listaUsuariosFiltrados: any = [];
  public mensagemFiltro: string;

  ngOnInit() {
    this.getListaUsuarios();
    document.getElementById('menu').style.display = '';

    this.mostrarBarraPesquisa = false;

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
  }

  public toggleBarraPesquisa() {
    this.mostrarBarraPesquisa = !this.mostrarBarraPesquisa;
  }

  public getListaUsuarios() {
    this.service.getUsuarios().then(response => {
      this.listaUsuarios = response;
    });
  }

  public filtraUsuarios(event) {
    this.mensagemFiltro = '';
    let valor = event.target.value;

    if (valor.length > 1) {
      this.listaUsuariosFiltrados = this.listaUsuarios.filter(usuario => {
        return usuario.full_name.toLowerCase().indexOf(valor.toLowerCase()) > -1;
      });
    } else {
      this.listaUsuariosFiltrados = [];
      this.mensagemFiltro = 'Digite ao menos 2 caracteres';
      return
    }

    if (valor && !this.listaUsuariosFiltrados.length) {
      this.mensagemFiltro = 'Nenhum usuário encontrado';
    }
  }

  public acessarPerfil(id) {
    this.router.navigate(['/perfil', id]);
  }

}
