import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormTreinoPageRoutingModule } from './form-treino-routing.module';
import { FormTreinoPage } from './form-treino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Incluído para formulários reativos
    IonicModule,
    FormTreinoPageRoutingModule
  ],
  declarations: [
    FormTreinoPage
  ]
})
export class FormTreinoPageModule {}
