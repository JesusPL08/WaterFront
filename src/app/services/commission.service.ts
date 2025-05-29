import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Commission } from '../models/commission.model';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  private apiUrl = `${environment.apiBaseUrl}/commissions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Commission[]> {
    return this.http.get<Commission[]>(this.apiUrl);
  }

  getById(id: number): Observable<Commission> {
    return this.http.get<Commission>(`${this.apiUrl}/${id}`);
  }

  create(commission: Commission): Observable<Commission> {
    // Asegurar que dateCreation esté presente
    if (!commission.dateCreation) {
      commission.dateCreation = new Date().toISOString();
    }
    return this.http.post<Commission>(this.apiUrl, commission);
  }

  update(id: number, commission: Commission): Observable<Commission> {
    return this.http.put<Commission>(`${this.apiUrl}/${id}`, commission);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
