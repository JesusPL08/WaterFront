import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AttendanceTypeService } from '../../../services/attendance-type.service';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { type_attendance } from '../../../models/type-attendance.model';

@Component({
  selector: 'app-create-edit-attendance-type',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent
  ],
  templateUrl: './create-edit-attendance-type.page.html',
  styleUrls: ['./create-edit-attendance-type.page.scss']
})
export class CreateEditAttendanceTypePage implements OnInit {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private attendanceTypeService: AttendanceTypeService,
    private dialogRef: MatDialogRef<CreateEditAttendanceTypePage>,
    @Inject(MAT_DIALOG_DATA) public data: type_attendance | null
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      paidDay: [true, Validators.required],
      payMult: [1.0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue(this.data);
    }
  }

  getSafeControl(name: string): FormControl {
    return (this.form.get(name) as FormControl) ?? new FormControl();
  }

  get booleanOptions() {
    return [
      { label: 'Sí', value: true },
      { label: 'No', value: false }
    ];
  }

  submit() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();
    const tipo: type_attendance = {
      name: raw.name,
      paidDay: Boolean(raw.paidDay),
      payMult: Number(raw.payMult)
    };

    if (this.isEditMode && this.data?.id) {
      this.attendanceTypeService.update(this.data.id, tipo).subscribe({
        next: () => {
          alert('Tipo de asistencia actualizado con éxito');
          this.dialogRef.close(true);
        },
        error: () => alert('Error al actualizar tipo de asistencia')
      });
    } else {
      this.attendanceTypeService.create(tipo).subscribe({
        next: () => {
          alert('Tipo de asistencia creado con éxito');
          this.dialogRef.close(true);
        },
        error: () => alert('Error al crear tipo de asistencia')
      });
    }
  }
}
