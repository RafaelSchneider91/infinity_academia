// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';
// import { HomePage } from './pages/home/home.page';

// const routes: Routes = [
//   // {path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
//   //   canLoad: [AuthGuard]
//   // },
//   {path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
//   },


//   {path: '', redirectTo: 'login', pathMatch: 'full'},
//   {path: 'login',loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]  // Protegendo a rota com o guard
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'form-treino',
    loadChildren: () => import('./pages/form-treino/form-treino.module').then(m => m.FormTreinoPageModule)
  },  {
    path: 'treinos-cadastrados',
    loadChildren: () => import('./pages/treinos-cadastrados/treinos-cadastrados.module').then( m => m.TreinosCadastradosPageModule)
  },
  {
    path: 'rotina-a',
    loadChildren: () => import('./pages/rotina-a/rotina-a.module').then( m => m.RotinaAPageModule)
  },
  {
    path: 'rotina-b',
    loadChildren: () => import('./pages/rotina-b/rotina-b.module').then( m => m.RotinaBPageModule)
  },
  {
    path: 'rotina-c',
    loadChildren: () => import('./pages/rotina-c/rotina-c.module').then( m => m.RotinaCPageModule)
  },
  {
    path: 'rotina-d',
    loadChildren: () => import('./pages/rotina-d/rotina-d.module').then( m => m.RotinaDPageModule)
  },
  {
    path: 'perfil-aluno',
    loadChildren: () => import('./pages/perfil-aluno/perfil-aluno.module').then( m => m.PerfilAlunoPageModule)
  },
  {
    path: 'aerobicos',
    loadChildren: () => import('./pages/aerobicos/aerobicos.module').then( m => m.AerobicosPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
