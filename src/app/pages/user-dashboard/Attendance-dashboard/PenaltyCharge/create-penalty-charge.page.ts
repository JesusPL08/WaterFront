import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../../../../models/user.model';
import { PenaltyCharge } from '../../../../models/penalty-charge.model';
import { PenaltyChargeService } from '../../../../services/penalty-charge.service';

@Component({
  selector: 'app-create-penalty-charge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-penalty-charge.page.html',
  styleUrls: ['./create-penalty-charge.page.scss']
})
export class CreatePenaltyChargePage implements OnInit {
  dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  daysInMonth: { date: number; isToday: boolean }[] = [];
  selectedDays: number[] = [];
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  currentMonthName = '';
  amount: number = 0;
  description: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User[],
    private dialogRef: MatDialogRef<CreatePenaltyChargePage>,
    private penaltyService: PenaltyChargeService,
    private snackBar: MatSnackBar
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

  cerrar(): void {
    this.dialogRef.close();
  }

  registrarCargos(): void {
    if (this.selectedDays.length === 0 || !this.amount || !this.description) {
      this.snackBar.open('Selecciona al menos un día y completa los campos', 'Cerrar', {
        duration: 4000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    const chargesToSend: PenaltyCharge[] = [];

    for (const user of this.data) {
      for (const day of this.selectedDays) {
        const date = new Date(this.currentYear, this.currentMonth, day);
        date.setHours(8, 0, 0, 0);

        chargesToSend.push({
          userId: user.id!,
          date: date.toISOString(),
          amount: this.amount,
          description: this.description
        });
      }
    }

    let enviados = 0;
    let huboError = false;

    for (const charge of chargesToSend) {
      this.penaltyService.create(charge).subscribe({
        next: () => {
          enviados++;
          if (enviados === chargesToSend.length && !huboError) {
            this.snackBar.open('✔️ Cargos registrados con éxito', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
            this.dialogRef.close(true);
          }
        },
        error: (err) => {
          huboError = true;
          const msg = err?.error?.message || 'Error al registrar cargos';
          this.snackBar.open(`❌ ${msg}`, 'Cerrar', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }
}
