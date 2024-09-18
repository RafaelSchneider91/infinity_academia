// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// // import { resolve } from 'path';
// // import { User } from '../interfaces/user';
// // import { NavController } from '@ionic/angular';
// import { Observable, of } from 'rxjs';

// // export const authGuard: CanActivateFn = (route, state) => {
// //   return true;
// // };

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthGuard implements CanActivate {

//   constructor(
//     private authService: AuthService,
//     private router: Router,

//   ){}

//   canActivate(): Observable<boolean> {
//     return of(false);
//   }

//   // canActivate(): Promise<boolean>{
//   //   return new Promise(resolve => {
//   //     this.authService.getAuth().onAuthStateChanged(user => {
//   //       if(!user) this.router.navigate(['login']);

//   //       resolve(user ? true : false);
//   //     })
//   //   });
//   // }
//   // async canActivate(): Promise<boolean> {
//   //   const user = await this.authService.getAuth();
//   //   if (!user) {
//   //     await this.router.navigate(['login']);
//   //     return false;
//   //   }
//   //   return true;
//   // }

// }
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'; // Importe o seu serviço de autenticação
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.isAuthenticated().then((isAuth) => {
      if (!isAuth) {
        this.router.navigate(['login']); // Redireciona para a página de login se não estiver autenticado
        return false;
      }
      return true;
    });
  }
}
