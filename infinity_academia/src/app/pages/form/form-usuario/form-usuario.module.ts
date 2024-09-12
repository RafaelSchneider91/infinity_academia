import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormUsuarioPageRoutingModule } from './form-usuario-routing.module';

import { FormUsuarioPage } from './form-usuario.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormUsuarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormUsuarioPage]
})
export class FormUsuarioPageModule {}
