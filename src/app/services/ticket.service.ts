import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {ticket} from '../models/Ticket.model'

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = `${environment.apiBaseUrl}/tickets`;

  constructor(private http: HttpClient) {}

  create(ticket: ticket): Observable<ticket> {
    return this.http.post<ticket>(this.apiUrl, ticket);
  }

  getById(id: number): Observable<ticket> {
    return this.http.get<ticket>(`${this.apiUrl}/${id}`);
  }

  update(id: number, ticket: ticket): Observable<ticket> {
    return this.http.put<ticket>(`${this.apiUrl}/${id}`, ticket);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<ticket[]> {
    return this.http.get<ticket[]>(this.apiUrl);
  }
}
