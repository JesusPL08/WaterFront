import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DeliveryBranch } from '../models/delivery-branch.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryBranchService {
  private apiUrl = `${environment.apiBaseUrl}/delivery-branches`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<DeliveryBranch[]> {
    return this.http.get<DeliveryBranch[]>(this.apiUrl);
  }

  getById(id: number): Observable<DeliveryBranch> {
    return this.http.get<DeliveryBranch>(`${this.apiUrl}/${id}`);
  }

  create(branch: DeliveryBranch): Observable<DeliveryBranch> {
    return this.http.post<DeliveryBranch>(this.apiUrl, branch);
  }

  update(id: number, branch: DeliveryBranch): Observable<DeliveryBranch> {
    return this.http.put<DeliveryBranch>(`${this.apiUrl}/${id}`, branch);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
