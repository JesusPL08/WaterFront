import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Salary } from '../models/salary.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private apiUrl = `${environment.apiBaseUrl}/salaries`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Salary[]> {
    return this.http.get<Salary[]>(this.apiUrl);
  }

  getById(id: number): Observable<Salary> {
    return this.http.get<Salary>(`${this.apiUrl}/${id}`);
  }

  create(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(this.apiUrl, salary);
  }

  update(id: number, salary: Salary): Observable<Salary> {
    return this.http.put<Salary>(`${this.apiUrl}/${id}`, salary);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
