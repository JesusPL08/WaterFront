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
  templateUrl: './create-edit-route-day.page.html',
  styleUrl: './create-edit-route-day.page.scss'
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
      name: [data?.name || '', Validators.required],
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
