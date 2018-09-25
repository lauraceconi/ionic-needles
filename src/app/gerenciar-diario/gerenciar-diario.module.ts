import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GerenciarDiarioPage } from './gerenciar-diario.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciarDiarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GerenciarDiarioPage]
})
export class GerenciarDiarioPageModule {}
