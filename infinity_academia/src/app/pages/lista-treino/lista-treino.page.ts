import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Treino, Usuario } from 'src/app/models/estrutura';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-lista-treino',
  templateUrl: './lista-treino.page.html',
  styleUrls: ['./lista-treino.page.scss'],
})
export class ListaTreinoPage implements OnInit {
  treinos: Treino[] = [];
  userId: number | null = null;
  isError: boolean = false;
  userName: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id ? +id : null;

    if (this.userId !== null) {
      this.loadUserAndTreinos();
    } else {
      this.isError = true;
      console.error('ID do usuário inválido ou não fornecido');
      this.presentAlert('Erro', 'ID do usuário inválido ou não fornecido. Por favor, selecione um usuário válido.');
    }
  }

  async loadUserAndTreinos(): Promise<void> {
    if (this.userId !== null) {
      try {
        const user = await this.service.getUserById(this.userId).toPromise();
        if (user) {
          this.userName = user.nome;
          await this.loadTreinos();
        } else {
          this.isError = true;
          this.presentAlert('Erro', 'Usuário não encontrado');
        }
      } catch (error) {
        console.error('Erro ao carregar informações do usuário', error);
        this.isError = true;
        this.presentAlert('Erro', 'Erro ao carregar informações do usuário');
      }
    }
  }

  async loadTreinos(): Promise<void> {
    if (this.userId !== null) {
      try {
        const treinos = await this.service.getTreinosByUserId(this.userId).toPromise();
        this.treinos = treinos || []; // Defina um array vazio se `treinos` for `undefined`
        if (this.treinos.length === 0) {
          this.presentToast('Nenhum treino encontrado para este usuário. Adicione um novo treino.', 'warning');
          setTimeout(() => {
            this.router.navigate(['/form-treino']); // Redirecionar para a página inicial
        }, 3000);
        }
      } catch (error) {
        console.error('Erro ao carregar treinos do usuário', error);
        this.presentAlert('Erro', 'Erro ao carregar treinos do usuário');
      }
    }
  }

  async deleteTreino(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir este treino?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: async () => {
            try {
              await this.service.deleteTreino(id).toPromise();
              this.treinos = this.treinos.filter(treino => treino.id !== id);
              await this.presentToast('Treino excluído com sucesso!', 'success');
              setTimeout(() => {
                this.router.navigate(['/form-treino']); // Redirecionar para a página inicial
            }, 3000);
            } catch (error) {
              console.error('Erro ao excluir treino', error);
              await this.presentToast('Erro ao excluir treino. Tente novamente.', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  private async presentToast(message: string, color: 'success' | 'danger' | 'warning' = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }
}
