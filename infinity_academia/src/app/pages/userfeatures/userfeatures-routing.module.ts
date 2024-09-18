import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserfeaturesPage } from './userfeatures.page';

const routes: Routes = [
  {
    path: '',
    component: UserfeaturesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserfeaturesPageRoutingModule {}
