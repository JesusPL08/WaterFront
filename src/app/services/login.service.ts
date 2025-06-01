import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiBaseUrl}/logins`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Login[]> {
    return this.http.get<Login[]>(this.apiUrl);
  }

  getByUserId(userId: number): Observable<Login> {
    return this.http.get<Login>(`${this.apiUrl}/by-user/${userId}`);
  }

  updatePasswordByUserId(userId: number, password: string): Observable<Login> {
    return this.http.put<Login>(`${this.apiUrl}/update-password/${userId}`, { password });

  }



  create(login: Login): Observable<Login> {
    return this.http.post<Login>(this.apiUrl, login);
  }

  update(id: number, login: Login): Observable<Login> {
    return this.http.put<Login>(`${this.apiUrl}/${id}`, login);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
