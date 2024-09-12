import { UsuarioCadastro } from './../interfaces/usuario-cadastro';
import { TreinoCadastro } from './../interfaces/treino-cadastro';
import { Treino, Usuario } from './../models/estrutura';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private treinoUrl = 'http://localhost:3000/treinos'; // URL do backend para treinos
  private apiUrl = 'http://localhost:3000/usuarios'; // URL do backend para usuários

  constructor(private http: HttpClient) {

  }
  // Método para criar um novo usuário
  createUser(usuario: UsuarioCadastro): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl); // Método para obter todos os usuários
  }

  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createTreino(treino: TreinoCadastro): Observable<any> {
    return this.http.post<any>(this.treinoUrl, treino);
  }

  // Método para obter todos os treinos
  getTreinos(): Observable<Treino[]> {
    return this.http.get<Treino[]>(this.treinoUrl);
  }

  deleteTreino(id: number): Observable<void> {
    return this.http.delete<void>(`${this.treinoUrl}/${id}`);
  }

  getTreinosByUserId(userId: number): Observable<Treino[]> {
    console.log('Chamando API para usuário:', userId); // Log para depuração
    return this.http.get<Treino[]>(`${this.treinoUrl}/usuario/${userId}`);
  }

  getAllTreinos(): Observable<Treino[]> {
    return this.http.get<Treino[]>(this.treinoUrl);
  }

}
