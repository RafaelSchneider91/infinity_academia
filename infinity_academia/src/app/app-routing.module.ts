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
  loadChildren: () => import('./pages/form/form-treino/form-treino.module').then(m => m.FormTreinoPageModule)
},
{
  path: 'form-usuario',
  loadChildren: () => import('./pages/form/form-usuario/form-usuario.module').then(m => m.FormUsuarioPageModule)
},
{
  path: 'lista-treino/:id',  // Note o parâmetro :id
  loadChildren: () => import('./pages/lista-treino/lista-treino.module').then(m => m.ListaTreinoPageModule)
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
