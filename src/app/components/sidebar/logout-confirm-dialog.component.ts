import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>¿Cerrar sesión?</h2>
    <mat-dialog-content>
      <p>¿Estás seguro de que quieres cerrar sesión?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="false">Cancelar</button>
      <button mat-button color="warn" [mat-dialog-close]="true">Cerrar sesión</button>
    </mat-dialog-actions>
  `,
})
export class LogoutConfirmDialogComponent {}
