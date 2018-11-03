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
  @ViewChild('pacInput') pacInput: any;
  public map: google.maps.Map;
  public local: any = {};
  public localizacao: boolean;
  public marker: any;
  lat: number = 51.678418;
  lng: number = 7.809007;


  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.map.addListener('click', event => {
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
          icon: '/assets/images/placeholder.png'
        });
        marker.setMap(this.map);
      } else {
        marker.setPosition(
          new google.maps.LatLng(
            event.latLng.lat(),
            event.latLng.lng())
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

  public adicionarLocal() {
    this.service.adicionarLocal(this.diario_id, this.local).then(response => {
      this.fecharModal();
    });
  }

  public uploadArquivo(event) {
    this.local.foto = event.target.files[0];
  }

}
