import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RotinaBPage } from './rotina-b.page';

const routes: Routes = [
  {
    path: '',
    component: RotinaBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RotinaBPageRoutingModule {}
