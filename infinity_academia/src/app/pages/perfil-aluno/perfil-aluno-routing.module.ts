import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAlunoPage } from './perfil-aluno.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilAlunoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilAlunoPageRoutingModule {}
