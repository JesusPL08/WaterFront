import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PenaltyCharge } from '../models/penalty-charge.model';

@Injectable({
  providedIn: 'root'
})
export class PenaltyChargeService {
  private apiUrl = `${environment.apiBaseUrl}/penalty-charges`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PenaltyCharge[]> {
    return this.http.get<PenaltyCharge[]>(this.apiUrl);
  }

  getById(id: number): Observable<PenaltyCharge> {
    return this.http.get<PenaltyCharge>(`${this.apiUrl}/${id}`);
  }

  create(penalty: PenaltyCharge): Observable<PenaltyCharge> {
    return this.http.post<PenaltyCharge>(this.apiUrl, penalty);
  }

  update(id: number, penalty: PenaltyCharge): Observable<PenaltyCharge> {
    return this.http.put<PenaltyCharge>(`${this.apiUrl}/${id}`, penalty);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
