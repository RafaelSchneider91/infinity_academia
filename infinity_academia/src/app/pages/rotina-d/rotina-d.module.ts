import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RotinaDPageRoutingModule } from './rotina-d-routing.module';

import { RotinaDPage } from './rotina-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RotinaDPageRoutingModule
  ],
  declarations: [RotinaDPage]
})
export class RotinaDPageModule {}
