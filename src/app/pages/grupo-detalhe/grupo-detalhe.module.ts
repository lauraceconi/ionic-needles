import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GrupoDetalhePage } from './grupo-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoDetalhePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GrupoDetalhePage]
})
export class GrupoDetalhePageModule {}
