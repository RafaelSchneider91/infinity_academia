import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TreinoCadastro } from 'src/app/interfaces/treino-cadastro';
import { Usuario } from 'src/app/models/estrutura';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-form-treino',
  templateUrl: './form-treino.page.html',
  styleUrls: ['./form-treino.page.scss'],
})
export class FormTreinoPage implements OnInit {

  treinoForm!: FormGroup;
  usuarios: Usuario[] = [];
  tiposMovimento: string[] = ['peito', 'costa', 'ombro', 'perna', 'aeróbica', 'abdômen'];
  diasSemana: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  seriesOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  repeticoesOptions: number[] = Array.from({ length: 50 }, (_, i) => i + 1);

  constructor(
    private fb: FormBuilder,
    private service: Service,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.tiposMovimento = this.tiposMovimento
      .map(tipo => tipo.charAt(0).toUpperCase() + tipo.slice(1))
      .sort();

    this.treinoForm = this.fb.group({
      usuarioId: ['', Validators.required],
      movimento: ['', Validators.required],
      serie: ['', Validators.required],
      repeticoes: ['', Validators.required],
      diasSemana: this.fb.array([]) // Inicializa o FormArray vazio
    });

    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.service.getUsers().subscribe(
      response => {
        this.usuarios = response;
      },
      error => {
        console.error('Erro ao carregar usuários', error);
      }
    );
  }

  get diasSemanaControls() {
    return (this.treinoForm.get('diasSemana') as FormArray).controls;
  }

  onDiaChange(dia: string, event: Event) {
    const diasSemanaArray = this.treinoForm.get('diasSemana') as FormArray;
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;

    if (isChecked) {
      diasSemanaArray.push(this.fb.control(dia));
    } else {
      const index = diasSemanaArray.controls.findIndex(control => control.value === dia);
      if (index !== -1) {
        diasSemanaArray.removeAt(index);
      }
    }
  }

  isDiaChecked(dia: string): boolean {
    const diasSemanaArray = this.treinoForm.get('diasSemana') as FormArray;
    return diasSemanaArray.controls.some(control => control.value === dia);
  }

  async onSubmit(): Promise<void> {
    if (this.treinoForm.valid) {
      const treino: TreinoCadastro = {
        usuarioId: +this.treinoForm.value.usuarioId,
        tipo: this.treinoForm.value.movimento,
        serie: this.treinoForm.value.serie,
        repeticao: this.treinoForm.value.repeticoes,
        status: 'ativo',
        modificacaoTs: new Date().toISOString(),
        diasSemana: this.treinoForm.value.diasSemana
      };

      try {
        await this.service.createTreino(treino).toPromise();
        await this.presentToast('Treino cadastrado com sucesso!', 'success');

        setTimeout(() => {
          this.router.navigate(['/home']); // Redireciona para a página inicial
        }, 3000);
      } catch (error) {
        console.error('Erro ao cadastrar treino', error);
        await this.presentToast('Erro ao cadastrar treino. Tente novamente.', 'danger');
      }
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
