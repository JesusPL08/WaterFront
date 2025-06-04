import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouteDayService } from '../../../services/route-day.service';
import { RouteDay } from '../../../models/route-day.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-edit-route-day-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar Ruta' : 'Crear Ruta' }}</h2>
    <form [formGroup]="form" (ngSubmit)="guardar()" class="p-2">
      <label>Fecha:</label>
      <input type="date" formControlName="routeDay" class="form-control mb-3" required />

      <label>Estado:</label>
      <select formControlName="status" class="form-control mb-3">
        <option [value]="true">Activa</option>
        <option [value]="false">Inactiva</option>
      </select>

      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-secondary me-2" (click)="dialogRef.close()">Cancelar</button>
        <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Guardar</button>
      </div>
    </form>
  `
})
export class CreateEditRouteDayModal {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateEditRouteDayModal>,
    @Inject(MAT_DIALOG_DATA) public data: RouteDay | null,
    private fb: FormBuilder,
    private routeDayService: RouteDayService
  ) {
    this.form = this.fb.group({
      routeDay: [data?.routeDay || '', Validators.required],
      status: [data?.status ?? true, Validators.required]
    });
  }

  guardar(): void {
    const values = this.form.value as RouteDay;

    if (this.data?.id) {
      this.routeDayService.update(this.data.id, values).subscribe(() => this.dialogRef.close(true));
    } else {
      this.routeDayService.create(values).subscribe(() => this.dialogRef.close(true));
    }
  }
}
