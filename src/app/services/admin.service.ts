import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.apiBaseUrl}/admin`;  // URL base para as requisições

  constructor(private http: HttpClient) { }

  // Método para obter todos os usuários
  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('access_token') ?? ''; // Obtemos o token de autenticação
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User[]>(`${this.apiUrl}/list`, { headers });
  }

  // Método para obter os dados de um usuário específico
  getUserById(userId: string): Observable<User> {
    const token = localStorage.getItem('access_token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.apiUrl}/user/${userId}`, { headers });
  }

  // Método para adicionar um novo usuário
  addUser(userData: User): Observable<User> {
    const token = localStorage.getItem('access_token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<User>(`${this.apiUrl}/add_user`, userData, { headers });
  }

  // Método para editar um usuário existente
  updateUser(userId: string, userData: User): Observable<User> {
    const token = localStorage.getItem('access_token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<User>(`${this.apiUrl}/update_user/${userId}`, userData, { headers });
  }

  // Método para excluir um usuário
  deleteUser(userId: string): Observable<void> {
    const token = localStorage.getItem('access_token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.apiUrl}/delete_user/${userId}`, { headers });
  }
}
