// form-treino.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserfeaturesService } from 'src/app/services/userfeatures/userfeatures.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Treino } from 'src/app/interfaces/treino';
import { Exercicio } from 'src/app/interfaces/exercicio';

@Component({
  selector: 'app-form-treino',
  templateUrl: './form-treino.page.html',
  styleUrls: ['./form-treino.page.scss'],
})
export class FormTreinoPage implements OnInit {
  treinoForm!: FormGroup;
  userId: string | null = null;
  diasDaSemana: string[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  // Listas de exercícios
  exerciciosPerdaPeso: Exercicio[] = [
    { movimento: 'Caminhada Rápida', serie: 1, repeticoes: '30-45 min' },
    { movimento: 'HIIT', serie: 3, repeticoes: '20 seg on/10 seg off (8-10 ciclos)' },
    { movimento: 'Bicicleta', serie: 1, repeticoes: '30-45 min' },
    { movimento: 'Corrida Leve', serie: 2, repeticoes: '20-30 min' },
    { movimento: 'Jumping Jacks', serie: 3, repeticoes: '15-20 repetições' },
    { movimento: 'Burpees', serie: 3, repeticoes: '10-15 repetições' },
    { movimento: 'Pular Corda', serie: 1, repeticoes: '15-20 min' },
    { movimento: 'Treino de Circuito', serie: 3, repeticoes: '1 min em cada exercício' },
    { movimento: 'Escalador', serie: 3, repeticoes: '30-60 seg' },
    { movimento: 'Agachamento com Salto', serie: 3, repeticoes: '10-15 repetições' }
  ];

  exerciciosGanhoMuscular: Exercicio[] = [
    { movimento: 'Supino', serie: 3, repeticoes: '10' },
    { movimento: 'Agachamento', serie: 3, repeticoes: '12' },
    { movimento: 'Puxada na barra', serie: 3, repeticoes: '8' },
    { movimento: 'Remada Curvada', serie: 3, repeticoes: '10' },
    { movimento: 'Desenvolvimento de Ombro', serie: 3, repeticoes: '10' },
    { movimento: 'Leg Press', serie: 3, repeticoes: '12' },
    { movimento: 'Flexão de Braço', serie: 3, repeticoes: '10' },
    { movimento: 'Stiff', serie: 3, repeticoes: '10' },
    { movimento: 'Tríceps Testa', serie: 3, repeticoes: '10' },
    { movimento: 'Elevação Lateral', serie: 3, repeticoes: '12' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private userFeaturesService: UserfeaturesService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.initializeForm();
    await this.getUserId();
    await this.loadTreinos();
  }

  initializeForm() {
    this.treinoForm = this.fb.group({
      objetivo: ['perda_peso', Validators.required],
      exercicios: this.fb.array([]),
      dias: this.fb.array([])
    });
  }

  async getUserId() {
    this.userId = await this.authService.getUserId();
    if (!this.userId) {
      this.presentToast('Erro: Usuário não autenticado.');
      this.router.navigate(['/login']);
    }
  }

  async loadTreinos() {
    if (this.userId) {
      this.userFeaturesService.getUserTreinos(this.userId).subscribe(treinos => {
        if (treinos && treinos.length > 0) {
          const treino = treinos[0];
          this.treinoForm.patchValue({
            objetivo: treino.objetivo || 'perda_peso',
            dias: treino.dias || [], // Aqui dias é um array de strings
          });
          this.populateExercicios(treino.exercicios || []);
        }
      }, error => {
        console.error('Erro ao carregar treinos:', error);
        this.presentToast('Erro ao carregar treinos.');
      });
    }
  }

  populateExercicios(exercicios: Exercicio[]) {
    const exerciciosArray = this.exerciciosControls;
    exercicios.forEach(exercicio => {
      exerciciosArray.push(this.fb.group({
        movimento: [exercicio.movimento, Validators.required],
        serie: [exercicio.serie, Validators.required],
        repeticoes: [exercicio.repeticoes, Validators.required], // Já é string
      }));
    });
  }

  createExercicioGroup(exercicio: Exercicio) {
    return this.fb.group({
      movimento: [exercicio.movimento, Validators.required],
      serie: [exercicio.serie, Validators.required],
      repeticoes: [exercicio.repeticoes, Validators.required],
    });
  }

  addExercicio(exercicio: Exercicio) {
    const exercicios = this.exerciciosControls;
    if (!exercicios.controls.some(ctrl => ctrl.value.movimento === exercicio.movimento)) {
      exercicios.push(this.createExercicioGroup(exercicio));
    } else {
      this.presentToast('Exercício já adicionado: ' + exercicio.movimento);
    }
  }

  gerarTreinosDaSemana() {
    const objetivo = this.treinoForm.get('objetivo')?.value;
    const exercicios = objetivo === 'perda_peso' ? this.exerciciosPerdaPeso : this.exerciciosGanhoMuscular;

    // Limpar o array de exercícios
    this.exerciciosControls.clear();

    // Obter os dias selecionados
    const diasSelecionados = this.treinoForm.get('dias')?.value || [];

    if (diasSelecionados.length === 0) {
      this.presentToast('Por favor, selecione pelo menos um dia da semana.');
      return;
    }

    // Para cada dia selecionado, adicione 5 exercícios aleatórios
    diasSelecionados.forEach(() => {
      const randomExercises = this.getRandomExercises(exercicios, 5); // Alterado para 5
      randomExercises.forEach(exercicio => {
        this.addExercicio(exercicio);
      });
    });
  }

  async saveTreino() {
    console.log('Tentando salvar treino...');
    if (this.treinoForm.valid && this.userId) {
      const treinoData: Treino = {
        objetivo: this.treinoForm.value.objetivo,
        exercicios: this.treinoForm.value.exercicios.map((ex: any) => ({
          movimento: ex.movimento,
          serie: ex.serie,
          repeticoes: ex.repeticoes, // Já é string
        })),
        dias: this.treinoForm.value.dias,
        timestamp: new Date(),
      };

      console.log('Dados do Treino a serem salvos:', treinoData);

      try {
        await this.userFeaturesService.salvaTreino(treinoData, this.userId);
        console.log('Treino salvo com sucesso!');
        this.presentToast('Treino salvo com sucesso!');
        this.router.navigate(['/home']); // Redireciona para a página inicial
      } catch (error: any) {
        console.error('Erro ao salvar treino:', error);
        this.presentToast('Erro ao salvar treino: ' + error.message);
      }
    } else {
      console.warn('Formulário inválido ou usuário não autenticado.');
      this.presentToast('Formulário inválido ou usuário não autenticado.');
    }
  }

  getRandomExercises(exercicios: Exercicio[], count: number): Exercicio[] {
    const shuffled = [...exercicios].sort(() => 0.5 - Math.random()); // Evita mutação do array original
    return shuffled.slice(0, count);
  }

  get exerciciosControls() {
    return this.treinoForm.get('exercicios') as FormArray;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  toggleDia(dia: string) {
    const diasControl = this.treinoForm.get('dias') as FormArray;

    if (diasControl.controls.find(control => control.value === dia)) {
      diasControl.removeAt(diasControl.controls.findIndex(control => control.value === dia));
    } else {
      diasControl.push(this.fb.control(dia));
    }

    // Chame a geração dos treinos após atualizar os dias
    this.gerarTreinosDaSemana();
  }

  isDiaSelecionado(dia: string): boolean {
    const dias = this.treinoForm.get('dias')?.value || [];
    return dias.includes(dia);
  }

  get diasControls() {
    return this.treinoForm.get('dias') as FormArray;
  }

  // Método para navegar para a página Home
  navigateToHome() {
    this.router.navigate(['/home']); // Rota para a página Home
  }

}
