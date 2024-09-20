// home.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserfeaturesService } from 'src/app/services/userfeatures/userfeatures.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Treino } from 'src/app/interfaces/treino';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userFeature$: Observable<any> | null = null;
  treinos$: Observable<Treino[]> | null = null;
  treinosByDia: { [dia: string]: Treino[] } = {};
  diasDaSemana: string[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  diasComTreinos: string[] = []; // Nova propriedade para armazenar dias com treinos
  userId: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userFeaturesService: UserfeaturesService
  ) {}

  async ngOnInit() {
    await this.loadUserData();
    this.loadTreinos();
  }

  // Método para carregar os dados do usuário
  async loadUserData() {
    try {
      this.userId = await this.authService.getUserId();
      if (this.userId) {
        this.userFeature$ = this.userFeaturesService.getUserFeature(this.userId);
      } else {
        console.error('Usuário não autenticado');
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Erro ao obter o ID do usuário:', error);
      this.router.navigate(['/login']);
    }
  }

  // Método para carregar e agrupar os treinos por dia
  loadTreinos() {
    if (this.userId) {
      this.treinos$ = this.userFeaturesService.getUserTreinos(this.userId).pipe(
        map(treinos =>
          treinos.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        )
      );

      // Inscrever-se no observable para agrupar treinos por dia
      this.treinos$.subscribe(treinos => {
        // Inicializar o objeto treinosByDia com arrays vazios
        this.diasDaSemana.forEach(dia => {
          this.treinosByDia[dia] = [];
        });

        // Agrupar treinos por dia
        treinos.forEach(treino => {
          treino.dias.forEach((dia: string) => {
            if (this.treinosByDia[dia]) {
              this.treinosByDia[dia].push(treino);
            }
          });
        });

        // Preencher diasComTreinos com os dias que possuem treinos
        this.diasComTreinos = this.diasDaSemana.filter(dia => this.treinosByDia[dia].length > 0);
      });
    } else {
      console.error('Usuário não autenticado. Não é possível carregar treinos.');
    }
  }

  // Método para navegar para a página Form Treino
  navigateToFormTreino() {
    this.router.navigate(['/form-treino']);
  }

  // Método para realizar logout
  async logout() {
    try {
      await this.authService.logout();
      console.log('Logout realizado com sucesso');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  }
}
