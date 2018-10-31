import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiarioDetalhePage } from './diario-detalhe.page';
import { ModalLocalComponent } from '../../components/modal-local/modal-local.component';

const routes: Routes = [
  {
    path: '',
    component: DiarioDetalhePage
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
    ModalLocalComponent
  ],
  declarations: [
    DiarioDetalhePage,
    ModalLocalComponent
  ]
})
export class DiarioDetalhePageModule {}
