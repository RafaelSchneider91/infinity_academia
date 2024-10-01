import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RotinaCPage } from './rotina-c.page';

const routes: Routes = [
  {
    path: '',
    component: RotinaCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RotinaCPageRoutingModule {}
