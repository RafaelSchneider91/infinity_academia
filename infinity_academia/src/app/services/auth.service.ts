// import { Injectable } from '@angular/core';
// import { User } from '../interfaces/user';
// import { AngularFireAuth } from '@angular/fire/compat/auth';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private afa: AngularFireAuth) {}

//   register(user: User) {
//     return this.afa.createUserWithEmailAndPassword(user.email!, user.password!);
//   }
  
//   login(user: User) {
//     return this.afa.signInWithEmailAndPassword(user.email!, user.password!);
//   }

//   getAuth(){
//     return this.afa.authState;
//   }
// }
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Exemplo com Firebase, pode ser outro serviço
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Verifica se o usuário está autenticado
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // Lógica de login (exemplo com Firebase)
  login(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  // TODO: criar a mensagem de "Usuario Criado com sucesso" e redirecionar para a pagina de login.
  register(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
  }
  // Lógica de logout
  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);  // Redireciona para a página de login após logout
    });
  }
}
