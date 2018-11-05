import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiarioService } from '../../services/diario.service';

@Component({
  selector: 'app-local-detalhe',
  templateUrl: './local-detalhe.page.html',
  styleUrls: ['./local-detalhe.page.scss'],
})
export class LocalDetalhePage implements OnInit {

  constructor(
    public service: DiarioService,
    public route: ActivatedRoute,
  ) { }

  public local_id: string;
  public local: any = {};
  @ViewChild('gmap') gmapElement: any;
  public map: google.maps.Map;
  public localizacao: boolean;
  public marker: any;

  ngOnInit() {
    this.local_id = this.route.snapshot.paramMap.get('id');
    this.getDetalhesLocal();

    if ('geolocation' in navigator) {
      this.localizacao = true;
    } else {
      this.localizacao = false;
    }
  }

  public getDetalhesLocal() {
    this.service.getDetalhesLocal(this.local_id).then(response => {
      this.local = response;

      const mapProp = {
        center: new google.maps.LatLng(this.local['latitude'], this.local['longitude']),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      };

      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      this.marker = new google.maps.Marker({
        position: { lat: this.local['latitude'], lng: this.local['longitude'] },
        icon: {
          url: '/assets/images/placeholder.png',
          size: new google.maps.Size(30, 30),
          scaledSize: new google.maps.Size(30, 30)
        }
      });
      this.marker.setMap(this.map);
    });
  }

}
