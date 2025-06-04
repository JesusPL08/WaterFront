import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RouteDelivery } from '../models/route-delivery.model';

@Injectable({
  providedIn: 'root'
})
export class RouteDeliveryService {
  private apiUrl = `${environment.apiBaseUrl}/routes-deliveries`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<RouteDelivery[]> {
    return this.http.get<RouteDelivery[]>(this.apiUrl);
  }

  getById(id: number): Observable<RouteDelivery> {
    return this.http.get<RouteDelivery>(`${this.apiUrl}/${id}`);
  }

  create(routeDelivery: RouteDelivery): Observable<RouteDelivery> {
    return this.http.post<RouteDelivery>(this.apiUrl, routeDelivery);
  }

  update(id: number, routeDelivery: RouteDelivery): Observable<RouteDelivery> {
    return this.http.put<RouteDelivery>(`${this.apiUrl}/${id}`, routeDelivery);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getByRoutesDayId(routesDayId: number): Observable<RouteDelivery[]> {
  return this.http.get<RouteDelivery[]>(`${this.apiUrl}?routesDayId=${routesDayId}`);
}

}
