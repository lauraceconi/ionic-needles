import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GrupoService } from '../../services/grupo.service';
import { LoginService } from '../../services/login.service';

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

  @Input('id_grupo') id_grupo : string;
  public grupo: any = { 'membros': [] };
  public membros: any = [];
  public listaUsuarios: any = [];
  public listaUsuariosFiltrados: any = [];
  public mensagemFiltro: string;
  public erros: any = {};
  public titulo: string;

  ngOnInit() {
    this.mensagemFiltro = '';
    this.getListaUsuarios();
    if (this.id_grupo) {
      this.grupoService.getGrupo(this.id_grupo).then(response => {
        this.grupo = response;
        this.membros = response['membros'];
      });
    }
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

  public addMembro(usuario: any) {
    const index1 = this.listaUsuarios.indexOf(usuario);
    const index2 = this.listaUsuariosFiltrados.indexOf(usuario);
    if (index1 > -1) { this.listaUsuarios.splice(index1, 1); }
    if (index2 > -1) { this.listaUsuariosFiltrados.splice(index2, 1); }
    this.membros.push(usuario);
  }

  public removeMembro(usuario: any) {
    const index = this.membros.indexOf(usuario);
    if (index > -1) { this.membros.splice(index, 1); }
    this.listaUsuarios.push(usuario);
  }

  public criarGrupo() {
    this.grupo['membros'] = [];
    for (let i = 0; i < this.membros.length; i++) {
      (this.grupo['membros']).push(parseInt(this.membros[i].id));
    }
    // this.grupo['membros'] = this.membros;
    this.grupoService.criarGrupo(this.grupo).then(response => {
      if (response['status'] == 400) {
        const chaves = Object.keys(response['error']);
        for (let i in chaves) {
          this.erros[chaves[i]] = response['error'][chaves[i]];
        }
      } else {
        this.fecharModal();
      }
    });
  }

  public removeErro(campo) {
    const mensagemCampo = this.erros[campo];
    if (mensagemCampo) { delete this.erros[campo]; }
  }

}
