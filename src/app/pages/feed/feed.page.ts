import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Searchbar } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoginService } from '../../services/login.service';

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

  @ViewChild('searchBar') searchbar: Searchbar;
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
        this.service.getDadosUsuarioLogado().then(response => {
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
    const valor = event.target.value;

    if (valor.length > 1) {
      this.listaUsuariosFiltrados = this.listaUsuarios.filter(usuario => {
        return usuario.full_name.toLowerCase().indexOf(valor.toLowerCase()) > -1;
      });
    } else {
      this.listaUsuariosFiltrados = [];
      this.mensagemFiltro = 'Digite ao menos 2 caracteres';
      return;
    }

    if (valor && !this.listaUsuariosFiltrados.length) {
      this.mensagemFiltro = 'Nenhum usuário encontrado';
    }
  }

  public acessarPerfil(id) {
    this.limpaTudo();
    this.router.navigate(['/perfil', id]);
  }

  public limpaTudo() {
    this.toggleBarraPesquisa();
    this.searchbar.value = '';
    this.listaUsuariosFiltrados = [];
    this.mensagemFiltro = '';
  }

}
