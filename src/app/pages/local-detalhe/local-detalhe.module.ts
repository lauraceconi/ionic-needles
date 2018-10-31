import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocalDetalhePage } from './local-detalhe.page';
import { DiarioService } from '../../services/diario.service';

const routes: Routes = [
  {
    path: '',
    component: LocalDetalhePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LocalDetalhePage],
  providers: [DiarioService]
})
export class LocalDetalhePageModule {}
