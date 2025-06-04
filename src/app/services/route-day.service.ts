import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RouteDay } from '../models/route-day.model';

@Injectable({
  providedIn: 'root'
})
export class RouteDayService {
  private apiUrl = `${environment.apiBaseUrl}/routes-days`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<RouteDay[]> {
    return this.http.get<RouteDay[]>(this.apiUrl);
  }

  getById(id: number): Observable<RouteDay> {
    return this.http.get<RouteDay>(`${this.apiUrl}/${id}`);
  }

  create(routeDay: RouteDay): Observable<RouteDay> {
    if (!routeDay.routeDay) {
      routeDay.routeDay = new Date().toISOString();
    }
    return this.http.post<RouteDay>(this.apiUrl, routeDay);
  }

  update(id: number, routeDay: RouteDay): Observable<RouteDay> {
    return this.http.put<RouteDay>(`${this.apiUrl}/${id}`, routeDay);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
