import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecomendacoesPage } from './recomendacoes.page';
import { ModalRecomendacaoComponent } from '../../components/modal-recomendacao/modal-recomendacao.component';

const routes: Routes = [
  {
    path: '',
    component: RecomendacoesPage
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
    ModalRecomendacaoComponent,
  ],
  declarations: [
    RecomendacoesPage,
    ModalRecomendacaoComponent
  ]
})
export class RecomendacoesPageModule {}
