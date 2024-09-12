import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar ToastController
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.page.html',
  styleUrls: ['./form-usuario.page.scss'],
})
export class FormUsuarioPage implements OnInit {

    userForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private service: Service,
        private router: Router,
        private toastController: ToastController // Injetar ToastController
    ) {}

    ngOnInit(): void {
        this.userForm = this.fb.group({
            nome: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    async onSubmit(): Promise<void> {
        if (this.userForm.valid) {
            const usuario = this.userForm.value;
            this.service.createUser(usuario).subscribe(
                async response => {
                    console.log('Usuário cadastrado com sucesso', response);
                    this.userForm.reset(); // Resetar o formulário após sucesso

                    // Criar e apresentar o Toast
                    const toast = await this.toastController.create({
                        message: 'Usuário cadastrado com sucesso!',
                        duration: 3000,
                        position: 'top'
                    });
                    await toast.present();

                    setTimeout(() => {
                        this.router.navigate(['/form-treino']); // Redirecionar para a página inicial
                    }, 3000);
                },
                error => {
                    console.error('Erro ao cadastrar usuário', error);
                }
            );
        }
    }
}
