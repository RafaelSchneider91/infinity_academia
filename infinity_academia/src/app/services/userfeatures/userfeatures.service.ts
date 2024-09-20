import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { perfilUsuarioFinal } from 'src/app/interfaces/perfilUsuarioFinal';
import { map } from 'rxjs/operators';
import { Treino } from 'src/app/interfaces/treino';
import firebase from 'firebase/compat/app'; // Importando a versão compatível do Firebase

@Injectable({
  providedIn: 'root'
})
export class UserfeaturesService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  // Método para adicionar características do usuário
  async addUserFeature(cpf: string, altura: number, peso: number, objetivo: string, dias: string[], treinos: Treino[]): Promise<void> {
    const userId = await this.authService.getUserId();
    if (!userId) {
      console.error('Usuário não autenticado ao tentar adicionar características.');
      return Promise.reject('Usuário não autenticado');
    }

    const userFeature: perfilUsuarioFinal = {
      cpf,
      altura,
      peso,
      objetivo,
      dias,
      treinos,
    };

    console.log('Adicionando características do usuário para userId:', userId);
    console.log('Dados do usuário:', userFeature);

    try {
      await this.firestore.collection('usuarios').doc(userId)
        .collection('user_features').doc(userId).set(userFeature);
      console.log('Características do usuário adicionadas com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar características do usuário:', error);
      throw error;
    }
  }

  // Método para obter características do usuário
  getUserFeature(userId: string): Observable<perfilUsuarioFinal | undefined> {
    return this.firestore.collection('usuarios').doc(userId)
      .collection('user_features').doc<perfilUsuarioFinal>(userId).valueChanges();
  }

  // Método para salvar o treino no Firestore
  salvaTreino(treinoData: Treino, userId: string): Promise<void> {
    console.log('Salvando treino no Firestore para userId:', userId);
    console.log('TreinoData:', treinoData);

    return this.firestore.collection('usuarios').doc(userId)
      .collection('user_features').doc(userId)
      .update({
        treinos: firebase.firestore.FieldValue.arrayUnion(treinoData)
      })
      .then(() => {
        console.log('Treino salvo com sucesso no Firestore!');
      })
      .catch(error => {
        console.error('Erro ao salvar treino no Firestore:', error);
        throw error;
      });
  }

  // Método para adicionar ou atualizar dados do usuário
  async addUserData(userData: any): Promise<void> {
    const userId = await this.authService.getUserId();
    if (!userId) {
      console.error('Usuário não autenticado ao tentar adicionar dados.');
      return Promise.reject('Usuário não autenticado');
    }

    console.log('Adicionando/Atualizando dados do usuário para userId:', userId);
    console.log('Dados do usuário:', userData);

    try {
      await this.firestore.collection('usuarios').doc(userId)
        .collection('user_features').doc(userId).set(userData, { merge: true });
      console.log('Dados do usuário adicionados com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar dados do usuário:', error);
      throw error;
    }
  }


  // Método para obter treinos do usuário
  getUserTreinos(userId: string): Observable<Treino[]> {
    return this.firestore.collection('usuarios').doc(userId)
      .collection('user_features').doc(userId)
      .valueChanges()
      .pipe(
        map((userFeature) => {
          const typedUserFeature = userFeature as perfilUsuarioFinal | undefined; // Asserção de tipo
          return typedUserFeature?.treinos || []; // Garante que seja um array
        })
      );
  }
}
