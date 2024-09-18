import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserfeaturesService {

  constructor(
    private db: AngularFirestore
  ) { }

  // Método para adicionar características do usuário
  addUserFeature(userId: string, peso: number, objetivo: string, dias: string[]) {
    // Cria o objeto com as características do usuário
    const userFeature = {
      peso,
      objetivo,
      dias
    };

    // Adiciona o documento na coleção 'user_features' com o ID do usuário
    return this.db.collection('user_features').doc(userId).set(userFeature)
      .then(() => {
        console.log('Características do usuário adicionadas com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao adicionar características do usuário: ', error);
      });
  }

}
