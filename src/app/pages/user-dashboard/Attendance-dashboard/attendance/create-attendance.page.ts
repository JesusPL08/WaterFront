import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../models/user.model';
import { type_attendance } from '../../../../models/type-attendance.model';
import { AttendanceTypeService } from '../../../../services/attendance-type.service';
import { AttendanceService } from '../../../../services/attendance.service';
import { Attendance } from '../../../../models/attendance.model';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-create-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-attendance.page.html',
  styleUrls: ['./create-attendance.page.scss']
})
export class CreateAttendancePage implements OnInit {
  dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  daysInMonth: { date: number; isToday: boolean }[] = [];
  selectedDays: number[] = [];
  attendanceTypes: type_attendance[] = [];
  selectedTypeId: number | null = null;

  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  currentMonthName = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User[],
    private dialogRef: MatDialogRef<CreateAttendancePage>,
    private attendanceTypeService: AttendanceTypeService,
    private attendanceService: AttendanceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.updateMonthName();
    this.generateCalendar();
    this.loadAttendanceTypes();
  }

  updateMonthName(): void {
    this.currentMonthName = new Date(this.currentYear, this.currentMonth).toLocaleString('default', {
      month: 'long'
    });
  }

  changeMonth(offset: number): void {
    this.currentMonth += offset;

    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    }

    this.updateMonthName();
    this.generateCalendar();
    this.selectedDays = []; // limpia días al cambiar de mes (puedes quitar esto si quieres conservarlos)
  }

generateCalendar(): void {
  const firstDay = new Date(this.currentYear, this.currentMonth, 1);
  const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
  const daysCount = lastDay.getDate();
  const startDayIndex = firstDay.getDay(); // 0 = domingo, 1 = lunes, ...

  this.daysInMonth = [];

  // Rellenar espacios vacíos antes del día 1
  for (let i = 0; i < startDayIndex; i++) {
    this.daysInMonth.push({ date: 0, isToday: false }); // 0 marca que está vacío
  }

  for (let i = 1; i <= daysCount; i++) {
    const isToday =
      i === this.today.getDate() &&
      this.currentMonth === this.today.getMonth() &&
      this.currentYear === this.today.getFullYear();

    this.daysInMonth.push({ date: i, isToday });
  }
}

  toggleDay(day: number): void {
    const index = this.selectedDays.indexOf(day);
    if (index === -1) {
      this.selectedDays.push(day);
    } else {
      this.selectedDays.splice(index, 1);
    }
  }

  isSelected(day: number): boolean {
    return this.selectedDays.includes(day);
  }

  loadAttendanceTypes(): void {
    this.attendanceTypeService.getAll().subscribe((types) => {
      this.attendanceTypes = types;
    });
  }

  selectAttendanceType(id: number): void {
    this.selectedTypeId = id;
  }

  cerrar(): void {
    this.dialogRef.close();
  }
registrarAsistencias(): void {
  if (this.selectedDays.length === 0 || this.selectedTypeId === null) {
    this.snackBar.open('Selecciona al menos un día y un tipo de asistencia', 'Cerrar', {
      duration: 4000,
      panelClass: ['snackbar-error']
    });
    return;
  }

  const attendancesToSend: Attendance[] = [];

  for (const user of this.data) {
    for (const day of this.selectedDays) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      date.setHours(8, 0, 0, 0); // 08:00:00 am

      const attendance: Attendance = {
        userId: user.id!,
        date: date.toISOString(),
        attendanceTypeId: this.selectedTypeId,
        workedHours: 8.0,
        paid: false,
        notes: 'Asistencia normal'
      };

      attendancesToSend.push(attendance);
    }
  }

  let enviados = 0;
  let huboError = false;

  for (const att of attendancesToSend) {
    this.attendanceService.create(att).subscribe({
      next: () => {
        enviados++;
        if (enviados === attendancesToSend.length && !huboError) {
          this.snackBar.open('✔️ Asistencias registradas con éxito', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.dialogRef.close(true);
        }
      },
      error: (err) => {
        huboError = true;
        const msg = err?.error?.message || 'Error al registrar una asistencia.';
        this.snackBar.open(`❌ ${msg}`, 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}



}
