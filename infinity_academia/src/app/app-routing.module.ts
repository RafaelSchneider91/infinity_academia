import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // {path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
  //   canLoad: [AuthGuard]
  // },
  {path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },


  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login',loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
