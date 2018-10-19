import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GrupoService } from '../services/grupo.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-modal-grupo',
  templateUrl: './modal-grupo.component.html',
  styleUrls: ['./modal-grupo.component.scss']
})
export class ModalGrupoComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    public grupoService: GrupoService,
    public loginService: LoginService
  ) { }

  public grupo: any = { 'membros': [] };
  public membros: any = [];
  public listaUsuarios: any = [];
  public listaUsuariosFiltrados: any = [];
  public mensagemFiltro: string;

  ngOnInit() {
    this.mensagemFiltro = '';
    this.getListaUsuarios();
  }

  public fecharModal() {
    this.modalCtrl.dismiss();
  }

  public getListaUsuarios() {
    this.loginService.getUsuarios().then(response => {
      this.listaUsuarios = response;
    });
  }

  public filtraUsuarios(event) {
    this.mensagemFiltro = '';
    let valor = event.target.value;

    if (valor.length > 1) {
      this.listaUsuariosFiltrados = this.listaUsuarios.filter(usuario => {
        return usuario.full_name.toLowerCase().indexOf(valor.toLowerCase()) > -1;;
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

  public addMembro(usuario: any) {
    var index1 = this.listaUsuarios.indexOf(usuario);
    var index2 = this.listaUsuariosFiltrados.indexOf(usuario);
    if (index1 > -1) this.listaUsuarios.splice(index1, 1);
    if (index2 > -1) this.listaUsuariosFiltrados.splice(index2, 1);
    this.membros.push(usuario);
  }

  public removeMembro(usuario: any) {
    var index = this.membros.indexOf(usuario);
    if (index > -1) this.membros.splice(index, 1);
    this.listaUsuarios.push(usuario);
  }

  public criarGrupo() {
    for (let i=0;i<this.membros.length;i++) {
      (this.grupo['membros']).push(this.membros[i].id);
    }
    //this.grupo['membros'] = this.membros;
    this.grupoService.criarGrupo(this.grupo).then(response => {
      this.fecharModal();
    });
  }

}
