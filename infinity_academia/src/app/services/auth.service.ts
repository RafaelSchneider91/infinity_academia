import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) {}

  register(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email!, user.password!);
  }
  
  login(user: User) {
    return this.afa.signInWithEmailAndPassword(user.email!, user.password!);
  }

  getAuth(){
    return this.afa.authState;
  }
}
