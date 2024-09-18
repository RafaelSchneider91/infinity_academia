import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserfeaturesPageRoutingModule } from './userfeatures-routing.module';

import { UserfeaturesPage } from './userfeatures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserfeaturesPageRoutingModule
  ],
  declarations: [UserfeaturesPage]
})
export class UserfeaturesPageModule {}
