import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AerobicosPage } from './aerobicos.page';

const routes: Routes = [
  {
    path: '',
    component: AerobicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AerobicosPageRoutingModule {}
