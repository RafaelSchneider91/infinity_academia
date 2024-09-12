import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTreinoPage } from './lista-treino.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTreinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTreinoPageRoutingModule {}
