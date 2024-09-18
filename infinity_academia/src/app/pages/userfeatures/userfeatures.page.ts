import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userfeatures',
  templateUrl: './userfeatures.page.html',
  styleUrls: ['./userfeatures.page.scss'],
})
export class UserfeaturesPage implements OnInit {

  public screen: any = 'peso'

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    ''
  }

  userData = {
    peso: null,
    objetivo: '',
    dias: []
  };

  next(screen: string) {
    this.screen = screen;
  }

  prev(screen: string) {
    this.screen = screen;
  }

  submit() {
    // Aqui você pode enviar os dados coletados para o serviço de backend
    console.log(this.userData);
    // Redirecionar para a página inicial ou realizar outras ações
    this.router.navigate(['/home']);
  }

}
