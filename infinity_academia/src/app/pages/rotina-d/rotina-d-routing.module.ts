import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RotinaDPage } from './rotina-d.page';

const routes: Routes = [
  {
    path: '',
    component: RotinaDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RotinaDPageRoutingModule {}
