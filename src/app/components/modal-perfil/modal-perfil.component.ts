import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.scss']
})
export class ModalPerfilComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    public storage: Storage,
    public service: PerfilService
  ) { }

  @Input('dados') dados : any;
  public nova_foto: any;

  ngOnInit() { }

  public fecharModal() {
    this.modalCtrl.dismiss();
  }

  public uploadFoto(event) {
    this.nova_foto = event.target.files[0];
  }

  public atualizarPerfil() {
    this.service.atualizarPerfil(this.dados, this.nova_foto).then(request => {
      this.fecharModal();
    });
  }

}
