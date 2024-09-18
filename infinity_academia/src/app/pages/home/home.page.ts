import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TreinoService } from '../../services/treinos/treino.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  treinos$?: Observable<any[]>;

  constructor(
    private authService: AuthService,
    private treinoService: TreinoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Carregar os treinos quando a página for inicializada
    this.loadTreinos();
  }

  ionViewWillEnter() {
    // Recarregar os treinos sempre que a página entrar em foco
    this.loadTreinos();
  }

  async loadTreinos() {
    const userId = await this.authService.getUserId();
    if (userId) {
      this.treinos$ = this.treinoService.getTreinosByUserId(userId);
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  }

  async deleteTreino(id: string) {
    try {
      await this.treinoService.deleteTreino(id);
      await this.presentToast('Treino excluído com sucesso!');
      console.log('Treino excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir treino:', error);
      await this.presentToast('Erro ao excluir treino.', 'danger');
    }
  }

  private async presentToast(
    message: string,
    color: 'success' | 'danger' = 'success'
  ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
    });
    await toast.present();
  }
}
