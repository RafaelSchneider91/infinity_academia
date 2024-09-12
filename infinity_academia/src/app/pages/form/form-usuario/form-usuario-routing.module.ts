import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormUsuarioPage } from './form-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: FormUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormUsuarioPageRoutingModule {}
