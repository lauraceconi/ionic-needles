import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecomendacaoDetalhePage } from './recomendacao-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: RecomendacaoDetalhePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecomendacaoDetalhePage]
})
export class RecomendacaoDetalhePageModule {}
