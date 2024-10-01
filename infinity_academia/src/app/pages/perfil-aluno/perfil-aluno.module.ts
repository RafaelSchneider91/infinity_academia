import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAlunoPageRoutingModule } from './perfil-aluno-routing.module';

import { PerfilAlunoPage } from './perfil-aluno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilAlunoPageRoutingModule
  ],
  declarations: [PerfilAlunoPage]
})
export class PerfilAlunoPageModule {}
