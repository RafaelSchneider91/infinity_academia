import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserfeaturesService } from 'src/app/services/userfeatures/userfeatures.service';

@Component({
  selector: 'app-userfeatures',
  templateUrl: './userfeatures.page.html',
  styleUrls: ['./userfeatures.page.scss'],
})
export class UserfeaturesPage implements OnInit {

  public screen: string = 'cpf'; // Inicializa como 'cpf'

  userData = {
    peso: 0,
    altura: 0,
    cpf: '',
    objetivo: '',
    dias: [],
    treinos: [], // Corrigido
  };

  constructor(
    private router: Router,
    private userFeaturesService: UserfeaturesService
  ) { }

  ngOnInit() {
    // Inicialize dados se necessário
  }

  next(screen: string) {
    this.screen = screen;
  }

  prev(screen: string) {
    this.screen = screen;
  }

  async submit() {
    const { cpf, altura, peso, objetivo, dias } = this.userData;

    try {
      await this.userFeaturesService.addUserFeature(cpf, altura, peso, objetivo, dias, this.userData.treinos);
      console.log('Características do usuário salvas com sucesso!');
      this.router.navigate(['/form-treino']);
    } catch (error) {
      console.error('Erro ao salvar características do usuário: ', error);
    }
  }
}
