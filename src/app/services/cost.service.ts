import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cost } from '../models/cost.model';

@Injectable({
  providedIn: 'root'
})
export class CostService {
  private apiUrl = `${environment.apiBaseUrl}/cost`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cost[]> {
    return this.http.get<Cost[]>(this.apiUrl);
  }

  getById(id: number): Observable<Cost> {
    return this.http.get<Cost>(`${this.apiUrl}/${id}`);
  }

  create(cost: Cost): Observable<Cost> {
    return this.http.post<Cost>(this.apiUrl, cost);
  }

  update(id: number, cost: Cost): Observable<Cost> {
    return this.http.put<Cost>(`${this.apiUrl}/${id}`, cost);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
