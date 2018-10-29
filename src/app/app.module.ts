import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
import { ModalGrupoComponent } from './modal-grupo/modal-grupo.component';
import { ModalRecomendacaoComponent } from './modal-recomendacao/modal-recomendacao.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalAlertaComponent,
    ModalLocalComponent,
    ModalGrupoComponent,
    ModalRecomendacaoComponent,
  ],
  entryComponents: [
    ModalAlertaComponent,
    ModalLocalComponent,
    ModalGrupoComponent,
    ModalRecomendacaoComponent
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
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    HttpClientModule,
    FormsModule,
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
