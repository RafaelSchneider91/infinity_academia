import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { TreinoService } from '../../services/treino.service';

@Component({
  selector: 'app-form-treino',
  templateUrl: './form-treino.page.html',
  styleUrls: ['./form-treino.page.scss'],
})
export class FormTreinoPage implements OnInit {

  treinoForm!: FormGroup;
  tipoObjetivo: string[] = ['Emagrecimento', 'Ganho de massa magra'];
  tiposMovimento: string[] = ['Tronco Anterior', 'Tronco Posterior', 'Membros Inferiores', 'Core', 'Aeróbico'];
  seriesOptions: number[] = [1, 2, 3, 4, 5];  // Séries entre 1 e 5
  repeticoesOptions: number[] = [6, 8, 10, 12, 15, 20];  // Repetições comuns em treinos de força e hipertrofia


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService, // Injetar o AuthService para obter o usuário logado
    private treinoService: TreinoService // Injetar o TreinoService para enviar dados para o Firestore
  ) {}


  async ngOnInit() {
    this.treinoForm = this.fb.group({
      usuarioId: [''],  // Será preenchido com o ID do usuário logado
      tipoObjetivo: ['', Validators.required],
      movimento: ['', Validators.required],
      serie: ['', Validators.required],
      repeticoes: ['', Validators.required],
      diasSemana: this.fb.array([])  // Novo campo para dias da semana
    });

    try {
      const userId = await this.authService.getUserId();
      if (userId) {
        this.treinoForm.patchValue({ usuarioId: userId });
      } else {
        console.error('Usuário não encontrado ou não está logado.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID do usuário:', error);
    }
  }

  get diasSemana(): FormArray {
    return this.treinoForm.get('diasSemana') as FormArray;
  }

  addDia(dia: string) {
    this.diasSemana.push(this.fb.control(dia));
  }

  removeDia(index: number) {
    this.diasSemana.removeAt(index);
  }

  selectedDate: string[] = [];

onDateChange(event: any) {
  const selectedDates = event.detail.value;
  this.diasSemana.clear();
  selectedDates.forEach((date: string) => {
    this.addDia(date);
  });
}

  async onSubmit() {
    if (this.treinoForm.valid) {
      try {
        await this.treinoService.addTreino(this.treinoForm.value);
        await this.presentToast('Treino cadastrado com sucesso!');
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Erro ao cadastrar treino:', error);
        await this.presentToast('Erro ao cadastrar treino.', 'danger');
      }
    } else {
      await this.presentToast('Preencha todos os campos obrigatórios.', 'danger');
    }
  }

  private async presentToast(message: string, color: 'success' | 'danger' = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
