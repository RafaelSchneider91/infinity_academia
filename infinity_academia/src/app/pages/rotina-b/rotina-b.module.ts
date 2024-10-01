import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RotinaBPageRoutingModule } from './rotina-b-routing.module';

import { RotinaBPage } from './rotina-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RotinaBPageRoutingModule
  ],
  declarations: [RotinaBPage]
})
export class RotinaBPageModule {}
