import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController, Platform, LoadingController } from '@ionic/angular';
import { DiarioService } from '../../services/diario.service';

@Component({
  selector: 'app-modal-local',
  templateUrl: './modal-local.component.html',
  styleUrls: ['./modal-local.component.scss']
})
export class ModalLocalComponent implements OnInit {

  constructor(
    public service: DiarioService,
    public modalCtrl: ModalController,
  ) {
  }

  @Input('diario_id') diario_id : string;
  @ViewChild('gmap') gmapElement: any;
  public map: google.maps.Map;
  public local: any = {};
  public localizacao: boolean;
  public marker: any;


  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.map.addListener('click', event => {
      this.local['latitude'] = event.latLng.lat();
      this.local['longitude'] = event.latLng.lng();
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position: { lat: this.local['latitude'], lng: this.local['longitude'] },
          icon: {
            url: '/assets/images/placeholder.png',
            size: new google.maps.Size(30, 30),
            scaledSize: new google.maps.Size(30, 30)
          }
        });
        this.marker.setMap(this.map);
      } else {
        this.marker.setPosition(
          new google.maps.LatLng(
            this.local['latitude'],
            this.local['longitude'])
        );
      }
    });

    if ('geolocation' in navigator) {
      this.localizacao = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      });
    } else {
      this.localizacao = false;
    }
  }

  public fecharModal() {
    this.modalCtrl.dismiss();
  }

  public uploadArquivo(event) {
    this.local.foto = event.target.files[0];
  }

  public adicionarLocal() {
    this.service.adicionarLocal(this.diario_id, this.local).then(response => {
      this.fecharModal();
    });
  }

}
