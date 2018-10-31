import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'feed', loadChildren: './pages/feed/feed.module#FeedPageModule' },
  { path: 'diarios', loadChildren: './pages/diarios/diarios.module#DiariosPageModule' },
  { path: 'diarios/:id', loadChildren: './pages/diario-detalhe/diario-detalhe.module#DiarioDetalhePageModule' },
  { path: 'local/:id', loadChildren: './pages/local-detalhe/local-detalhe.module#LocalDetalhePageModule' },
  { path: 'grupos', loadChildren: './pages/grupos/grupos.module#GruposPageModule' },
  { path: 'grupos/:id', loadChildren: './pages/grupo-detalhe/grupo-detalhe.module#GrupoDetalhePageModule' },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'perfil/:id', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  { path: 'recomendacoes', loadChildren: './pages/recomendacoes/recomendacoes.module#RecomendacoesPageModule' },
  { path: 'recomendacoes/:id', loadChildren: './pages/recomendacao-detalhe/recomendacao-detalhe.module#RecomendacaoDetalhePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
