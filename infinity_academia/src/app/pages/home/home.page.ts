import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { AlertController } from '@ionic/angular';
import { Service } from 'src/app/services/service';
import { Usuario } from 'src/app/models/estrutura';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  searchTerm: string = '';

  constructor(
    private authserive: AuthService,
    private service: Service,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  async logout(){
    try {
      await this.authserive.logout();
    }catch(error){
      console.error(error);
    }
  }

  loadUsuarios(): void {
    this.service.getUsers().subscribe(
      response => {
        this.usuarios = response;
        this.filteredUsuarios = response;
      },
      error => {
        console.error('Erro ao carregar usuários', error);
      }
    );
  }

  filterUsers(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.nome.toLowerCase().includes(searchTermLower) ||
      usuario.email.toLowerCase().includes(searchTermLower)
    );
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Informação',
      message: 'Nenhum usuário cadastrado.',
      buttons: [
        {
          text: 'Cadastrar Usuário',
          handler: () => {
            this.router.navigate(['/form-usuario']);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteUser(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir este usuário e todos os treinos associados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.service.deleteUser(id).subscribe(
              () => {
                console.log('Usuário e treinos associados excluídos com sucesso');
                this.loadUsuarios(); // Recarrega a lista de usuários após exclusão
              },
              error => {
                console.error('Erro ao excluir usuário e treinos', error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }
}



