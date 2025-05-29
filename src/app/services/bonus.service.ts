import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Bonus } from '../models/bonus.model';

@Injectable({
  providedIn: 'root'
})
export class BonusService {
  private apiUrl = `${environment.apiBaseUrl}/bonuses`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bonus[]> {
    return this.http.get<Bonus[]>(this.apiUrl);
  }

  getById(id: number): Observable<Bonus> {
    return this.http.get<Bonus>(`${this.apiUrl}/${id}`);
  }

  create(bonus: Bonus): Observable<Bonus> {
    return this.http.post<Bonus>(this.apiUrl, bonus);
  }

  update(id: number, bonus: Bonus): Observable<Bonus> {
    return this.http.put<Bonus>(`${this.apiUrl}/${id}`, bonus);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
