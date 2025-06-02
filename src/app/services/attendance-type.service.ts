import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { type_attendance } from '../models/type-attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceTypeService {
  private apiUrl = `${environment.apiBaseUrl}/attendance-types`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<type_attendance[]> {
    return this.http.get<type_attendance[]>(this.apiUrl);
  }

  getById(id: number): Observable<type_attendance> {
    return this.http.get<type_attendance>(`${this.apiUrl}/${id}`);
  }

  create(attendanceType: type_attendance): Observable<type_attendance> {
    return this.http.post<type_attendance>(this.apiUrl, attendanceType);
  }

  update(id: number, attendanceType: type_attendance): Observable<type_attendance> {
    return this.http.put<type_attendance>(`${this.apiUrl}/${id}`, attendanceType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
