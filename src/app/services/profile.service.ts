import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiBaseUrl}/profiles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }

  getById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${id}`);
  }

  create(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile);
  }

  update(id: number, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/${id}`, profile);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
