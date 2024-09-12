import { Component } from '@angular/core';
import { Usuario } from './models/estrutura';
import { Service } from './services/service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  usuario!: Usuario;

  constructor(private serv: Service) {}
}
