import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GruposPage } from './grupos.page';
import { ModalGrupoComponent } from '../../components/modal-grupo/modal-grupo.component';

const routes: Routes = [
  {
    path: '',
    component: GruposPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    ModalGrupoComponent
  ],
  declarations: [
    GruposPage,
    ModalGrupoComponent
  ]
})
export class GruposPageModule {}
