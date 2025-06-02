import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { AttendanceTypeService } from '../../services/attendance-type.service';
import { CreateEditAttendanceTypePage } from './create-edit/create-edit-attendance-type.page';

import { type_attendance } from '../../models/type-attendance.model';

@Component({
  selector: 'app-attendance-type-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    TableComponent
  ],
  templateUrl: './attendance-type.page.html',
  styleUrls: ['./attendance-type.page.scss']
})
export class AttendanceTypePage implements OnInit {
  tiposAsistencia: any[] = [];

  constructor(
    private attendanceTypeService: AttendanceTypeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarTipos();
  }

  cargarTipos() {
    this.attendanceTypeService.getAll().subscribe({
      next: tipos => {
        this.tiposAsistencia = tipos.map(t => ({
          ...t,
          paid_day: t.paidDay ? 'Sí' : 'No',
          pay_mult: Number(t.payMult),
          createdAtFormatted: new Date(t.createdAt || '').toLocaleDateString()
        }));
      },
      error: err => console.error('Error al cargar tipos de asistencia', err)
    });
  }

  abrirModal(tipo?: type_attendance) {
    const dialogRef = this.dialog.open(CreateEditAttendanceTypePage, {
      width: '600px',
      disableClose: false,
      data: tipo || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarTipos();
    });
  }

  eliminar(tipo: type_attendance) {
    if (!tipo.id) return;

    if (confirm(`¿Seguro que deseas eliminar el tipo "${tipo.name}"?`)) {
      this.attendanceTypeService.delete(tipo.id).subscribe({
        next: () => this.cargarTipos(),
        error: () => alert('No se pudo eliminar el tipo de asistencia.')
      });
    }
  }
}
