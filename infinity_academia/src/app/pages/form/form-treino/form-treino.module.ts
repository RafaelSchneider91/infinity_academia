import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTreinoPageRoutingModule } from './form-treino-routing.module';

import { FormTreinoPage } from './form-treino.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormTreinoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormTreinoPage]
})
export class FormTreinoPageModule {}
