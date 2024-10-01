import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RotinaCPageRoutingModule } from './rotina-c-routing.module';

import { RotinaCPage } from './rotina-c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RotinaCPageRoutingModule
  ],
  declarations: [RotinaCPage]
})
export class RotinaCPageModule {}
