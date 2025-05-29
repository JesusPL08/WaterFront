import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Branch } from '../models/branch.model';


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = `${environment.apiBaseUrl}/branches`;

  constructor(private http: HttpClient) {}

  // Crear sucursal
  createBranch(branch: Branch): Observable<Branch> {
    return this.http.post<Branch>(this.apiUrl, branch);
  }

  // Obtener por ID
  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/${id}`);
  }

  // Obtener todas
  getAllBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }

  // Actualizar
  updateBranch(id: number, branch: Branch): Observable<Branch> {
    return this.http.put<Branch>(`${this.apiUrl}/${id}`, branch);
  }

  // Eliminar
  deleteBranch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
