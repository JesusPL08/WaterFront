import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';
import { AttendanceService } from '../../../services/attendance.service';
import { BonusService } from '../../../services/bonus.service';
import { PenaltyChargeService } from '../../../services/penalty-charge.service';
import { Attendance } from '../../../models/attendance.model';
import { Bonus } from '../../../models/bonus.model';
import { PenaltyCharge } from '../../../models/penalty-charge.model';

@Component({
  selector: 'app-view-register',
  standalone: true,
  templateUrl: './view-register.page.html',
  styleUrls: ['./view-register.page.scss'],
  imports: [CommonModule, FormsModule]
})
export class ViewRegisterPage implements OnInit {
  dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  daysInMonth: { date: number; isToday: boolean }[] = [];
  selectedDays: number[] = [];
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  currentMonthName = '';

  selectedUser: User | null = null;
  selectedUserId: number | null = null;

  showAttendance = true;
  showBonus = true;
  showPenalty = true;

  registros: {
  id: number;
  tipo: string;
  fecha: string;
  amount?: number;
  workedHours?: number;
  descripcion?: string;
  selected?: boolean;
}[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User[],
    private dialogRef: MatDialogRef<ViewRegisterPage>,
    private attendanceService: AttendanceService,
    private bonusService: BonusService,
    private penaltyService: PenaltyChargeService
  ) {}

  ngOnInit(): void {
    this.updateMonthName();
    this.generateCalendar();
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
    this.selectedDays = [];
    this.registros = [];
  }

  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysCount = lastDay.getDate();
    const startDayIndex = firstDay.getDay();

    this.daysInMonth = [];

    for (let i = 0; i < startDayIndex; i++) {
      this.daysInMonth.push({ date: 0, isToday: false });
    }

    for (let i = 1; i <= daysCount; i++) {
      const isToday =
        i === this.today.getDate() &&
        this.currentMonth === this.today.getMonth() &&
        this.currentYear === this.today.getFullYear();

      this.daysInMonth.push({ date: i, isToday });
    }
  }

  isSelected(day: number): boolean {
    return this.selectedDays.includes(day);
  }

  toggleDay(day: number): void {
    const index = this.selectedDays.indexOf(day);
    if (index >= 0) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.selectedUserId = user.id ?? null;
    this.registros = [];
  }

  verRegistros(): void {
    if (!this.selectedUser || this.selectedDays.length === 0) return;

    this.registros = [];
    const selectedDates = this.selectedDays.map(
      d => new Date(this.currentYear, this.currentMonth, d).toISOString().split('T')[0]
    );

    if (this.showAttendance) {
      this.attendanceService.getAll().subscribe((data: Attendance[]) => {
        const filtered = data.filter(a =>
          a.userId === this.selectedUser!.id && selectedDates.includes(a.date.split('T')[0])
        ).map(a => ({
          id: a.id!,
          tipo: 'Asistencia',
          fecha: a.date,
          workedHours: a.workedHours,
          descripcion: a.notes,
          selected: false
        }))
        ;
        this.registros.push(...filtered);
      });
    }

    if (this.showBonus) {
      this.bonusService.getAll().subscribe((data: Bonus[]) => {
        const filtered = data.filter(b =>
          b.userId === this.selectedUser!.id && selectedDates.includes(b.date.split('T')[0])
        ).map(b => ({
           id: b.id!,
          tipo: 'Bono',
          fecha: b.date,
          amount: b.amount,
          descripcion: b.description,
          selected: false
        }));

        this.registros.push(...filtered);
      });
    }

    if (this.showPenalty) {
      this.penaltyService.getAll().subscribe((data: PenaltyCharge[]) => {
        const filtered = data.filter(p =>
          p.userId === this.selectedUser!.id && selectedDates.includes(p.date.split('T')[0])
        ).map(p => ({
           id: p.id!,
          tipo: 'Penalización',
          fecha: p.date,
          amount: p.amount,
          descripcion: p.description,
          selected: false
        }));
        this.registros.push(...filtered);
      });
    }
  }
eliminarSeleccionados(): void {
  const eliminados = this.registros.filter(r => r.selected);

  eliminados.forEach(reg => {
    if (reg.tipo === 'Asistencia') {
      this.attendanceService.delete(reg.id).subscribe();
    } else if (reg.tipo === 'Bono') {
      this.bonusService.delete(reg.id).subscribe();
    } else if (reg.tipo === 'Penalización') {
      this.penaltyService.delete(reg.id).subscribe();
    }
  });

  // Filtra de la tabla los eliminados
  this.registros = this.registros.filter(r => !r.selected);
}

get haySeleccionados(): boolean {
  return this.registros.some(r => r.selected);
}

  cerrar(): void {
    this.dialogRef.close();
  }
}
