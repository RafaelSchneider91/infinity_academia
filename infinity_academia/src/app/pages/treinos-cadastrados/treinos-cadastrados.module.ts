import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinosCadastradosPageRoutingModule } from './treinos-cadastrados-routing.module';

import { TreinosCadastradosPage } from './treinos-cadastrados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinosCadastradosPageRoutingModule
  ],
  declarations: [TreinosCadastradosPage]
})
export class TreinosCadastradosPageModule {}
