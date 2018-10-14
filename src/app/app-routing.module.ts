import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'feed', loadChildren: './feed/feed.module#FeedPageModule' },
  { path: 'diarios', loadChildren: './diarios/diarios.module#DiariosPageModule' },
  { path: 'diario/:id', loadChildren: './diario-detalhe/diario-detalhe.module#DiarioDetalhePageModule' },
  { path: 'local/:id', loadChildren: './local-detalhe/local-detalhe.module#LocalDetalhePageModule' },
  { path: 'grupos', loadChildren: './grupos/grupos.module#GruposPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'perfil/:id', loadChildren: './perfil/perfil.module#PerfilPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
