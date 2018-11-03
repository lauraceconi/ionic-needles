import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { ModalPerfilComponent } from '../../components/modal-perfil/modal-perfil.component';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  entryComponents: [
    ModalPerfilComponent
  ],
  declarations: [
    PerfilPage,
    ModalPerfilComponent
  ]
})
export class PerfilPageModule {}
