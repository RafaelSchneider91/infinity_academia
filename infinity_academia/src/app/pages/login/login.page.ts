import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import * as e from 'express';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  screen: any = 'signin'
  // formData: FormGroup;
  // isLoading: boolean = false;
  private loading: any;
  public toast: any;
  public userLogin: User = {email: '', password: ''};
  public userRegister: User = {email: '', password: ''};

  constructor(
 
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    ''
  }

  change(event: string){
    this.screen = event;
  }

  async login(){
    await this.presentLoading();
    try {
      // Chama o método de login do AuthService
      await this.authService.login(this.userLogin);
      console.log(this.userLogin)
        this.router.navigate(['/home']);
    } 
    catch (error: any) {
      this.presentToast(error.message || 'Erro desconhecido');
    }
    finally {
      if (this.loading) {
        this.loading.dismiss();
      }
    }
  }

  // async login (){
  //   console.log(this.userLogin)
  // }

  
  async register() {
  await this.presentLoading();

  try {
    // Chama o método de registro do AuthService
    await this.authService.register(this.userRegister);
    this.router.navigate(['/login']);
  } 
  catch (error: any) {
    this.presentToast(error.message || 'Erro desconhecido');
  }
  finally {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}

  
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });

    return this.loading.present();
  }

  
  async presentToast(message: string) {
    this.toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'top', // Certifique-se de que o toast esteja visível
    });
  
    return this.toast.present();
  }
  
}
