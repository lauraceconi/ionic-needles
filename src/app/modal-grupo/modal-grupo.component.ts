import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GrupoService } from '../services/grupo.service';

@Component({
  selector: 'app-modal-grupo',
  templateUrl: './modal-grupo.component.html',
  styleUrls: ['./modal-grupo.component.scss']
})
export class ModalGrupoComponent implements OnInit {

  constructor(public modalCtrl: ModalController,
              public service: GrupoService) { }

  public grupo: object = {};
  public membros: any = [];
  public listaUsuarios: any = [];
  public listaUsuariosFiltrados: any = [];
  public mensagemFiltro: string = '';  

  ngOnInit() {
    this.getListaUsuarios();
  }

  public fecharModal() {
    this.modalCtrl.dismiss();
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

  public addMembro(id_membro: number) {
    this.membros.push(id_membro);
  }

  public removeMembro(id_membro: number) {
    var index = this.membros.indexOf(id_membro);
    if (index > -1) this.membros.splice(index, 1);
  }

  public criarGrupo() {
    this.grupo['membros'] = this.membros;
    this.service.criarGrupo(this.grupo).then(response => {
      this.fecharModal();
    });
  }

}
