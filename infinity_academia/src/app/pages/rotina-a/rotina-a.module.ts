import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RotinaAPageRoutingModule } from './rotina-a-routing.module';

import { RotinaAPage } from './rotina-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RotinaAPageRoutingModule
  ],
  declarations: [RotinaAPage]
})
export class RotinaAPageModule {}
