import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RotinaAPage } from './rotina-a.page';

const routes: Routes = [
  {
    path: '',
    component: RotinaAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RotinaAPageRoutingModule {}
