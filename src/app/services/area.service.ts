import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { area } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaServices {
  private apiUrl = `${environment.apiBaseUrl}/areas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<area[]> {
    return this.http.get<area[]>(this.apiUrl);
  }

  getById(id: number): Observable<area> {
    return this.http.get<area>(`${this.apiUrl}/${id}`);
  }

  create(area: area): Observable<area> {
    return this.http.post<area>(this.apiUrl, area);
  }

  update(id: number, area: area): Observable<area> {
    return this.http.put<area>(`${this.apiUrl}/${id}`, area);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
