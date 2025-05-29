import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiUrl = `${environment.apiBaseUrl}/routes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Route[]> {
    return this.http.get<Route[]>(this.apiUrl);
  }

  getById(id: number): Observable<Route> {
    return this.http.get<Route>(`${this.apiUrl}/${id}`);
  }

  create(route: Route): Observable<Route> {
    return this.http.post<Route>(this.apiUrl, route);
  }

  update(id: number, route: Route): Observable<Route> {
    return this.http.put<Route>(`${this.apiUrl}/${id}`, route);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
