import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'feed', loadChildren: './feed/feed.module#FeedPageModule' },
  { path: 'diarios', loadChildren: './diarios/diarios.module#DiariosPageModule' },
  { path: 'detalhes/:id', loadChildren: './diario-detalhe/diario-detalhe.module#DiarioDetalhePageModule' },
  { path: 'local-detalhes/:id', loadChildren: './local-detalhe/local-detalhe.module#LocalDetalhePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
