import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AerobicosPageRoutingModule } from './aerobicos-routing.module';

import { AerobicosPage } from './aerobicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AerobicosPageRoutingModule
  ],
  declarations: [AerobicosPage]
})
export class AerobicosPageModule {}
