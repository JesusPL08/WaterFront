import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExpenseType } from '../models/expense-type.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {
  private apiUrl = `${environment.apiBaseUrl}/expense-types`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ExpenseType[]> {
    return this.http.get<ExpenseType[]>(this.apiUrl);
  }

  getById(id: number): Observable<ExpenseType> {
    return this.http.get<ExpenseType>(`${this.apiUrl}/${id}`);
  }

  create(expenseType: ExpenseType): Observable<ExpenseType> {
    return this.http.post<ExpenseType>(this.apiUrl, expenseType);
  }

  update(id: number, expenseType: ExpenseType): Observable<ExpenseType> {
    return this.http.put<ExpenseType>(`${this.apiUrl}/${id}`, expenseType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
