import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTreinoPage } from './form-treino.page';

const routes: Routes = [
  {
    path: '',
    component: FormTreinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTreinoPageRoutingModule {}
