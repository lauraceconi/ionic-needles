import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'feed', loadChildren: './feed/feed.module#FeedPageModule' },
  { path: 'diarios', loadChildren: './diarios/diarios.module#DiariosPageModule' },
  { path: 'gerenciar-diario', loadChildren: './gerenciar-diario/gerenciar-diario.module#GerenciarDiarioPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
