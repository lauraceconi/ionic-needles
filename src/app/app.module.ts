import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { App } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ModalAlertaComponent } from './modal-alerta/modal-alerta.component';
import { ApiService } from './services/api.service';
import { DiarioService } from './services/diario.service';
import { ModalLocalComponent } from './modal-local/modal-local.component';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent, 
    ModalAlertaComponent, 
    ModalLocalComponent
  ],
  entryComponents: [
    ModalAlertaComponent,
    ModalLocalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'md'
    }),
    IonicStorageModule.forRoot({
      name: "__needles",
      driverOrder: ['indexeddb', 'websql', 'localstorage']
    }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { 
      enabled: environment.production 
    }),
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC4ODNoDy-1S6wKxnUNUX9ZMoePoDm4GrE'
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    DiarioService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
