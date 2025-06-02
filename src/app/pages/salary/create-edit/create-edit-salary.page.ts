import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SalaryService } from '../../../services/salary.service';
import { Salary } from '../../../models/salary.model';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-create-edit-salary',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent
  ],
  templateUrl: './create-edit-salary.page.html',
  styleUrls: ['./create-edit-salary.page.scss']
})
export class CreateEditSalaryPage implements OnInit {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private dialogRef: MatDialogRef<CreateEditSalaryPage>,
    @Inject(MAT_DIALOG_DATA) public data: Salary | null
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      baseRate: [0, [Validators.required, Validators.min(0)]]
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

  submit() {
    if (this.form.invalid) return;

    const salary: Salary = {
      name: this.form.value.name,
      baseRate: parseFloat(this.form.value.baseRate)
    };

    if (this.isEditMode && this.data?.id) {
      this.salaryService.update(this.data.id, salary).subscribe({
        next: () => {
          alert('Salario actualizado con éxito');
          this.dialogRef.close(true);
        },
        error: () => alert('Error al actualizar salario')
      });
    } else {
      this.salaryService.create(salary).subscribe({
        next: () => {
          alert('Salario creado con éxito');
          this.dialogRef.close(true);
        },
        error: () => alert('Error al crear salario')
      });
    }
  }
}
