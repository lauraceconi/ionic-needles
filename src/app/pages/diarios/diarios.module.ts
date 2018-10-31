import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiariosPage } from './diarios.page';
import { DiarioService } from '../../services/diario.service';

const routes: Routes = [
  {
    path: '',
    component: DiariosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiariosPage]
})
export class DiariosPageModule {}
