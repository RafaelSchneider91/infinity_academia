import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreinoService {

  private treinosCollection = this.firestore.collection('treinos');

  constructor(private firestore: AngularFirestore) { }

  // Método para buscar todos os treinos
  getTreinos(): Observable<any[]> {
    return this.treinosCollection.valueChanges({ idField: 'id' });
  }

  getTreinosByUserId(usuarioId: string): Observable<any[]> {
    return this.firestore.collection('treinos', ref => ref.where('usuarioId', '==', usuarioId))
                       .valueChanges({ idField: 'id' });
  }

  // Método para adicionar um treino
  addTreino(treino: any): Promise<void> {
    const id = this.firestore.createId();
    return this.treinosCollection.doc(id).set(treino);
  }

  // Método para excluir um treino
  deleteTreino(id: string): Promise<void> {
    return this.treinosCollection.doc(id).delete();
  }
}
