import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AreaServices } from '../../../services/area.service';
import { area } from '../../../models/area.model';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-edit-area',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent
  ],
  templateUrl: './create-edit-area.page.html',
  styleUrls: ['./create-edit-area.page.scss']
})
export class CreateEditAreaPage implements OnInit {
  form: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private areaService: AreaServices,
    private dialogRef: MatDialogRef<CreateEditAreaPage>,
    @Inject(MAT_DIALOG_DATA) public data: area | null
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue({ name: this.data.name });
    }
  }
getSafeControl(name: string): FormControl {
  return (this.form.get(name) as FormControl) ?? new FormControl();
}

  submit() {
    if (this.form.invalid) return;

    const payload: area = {
      name: this.form.value.name
    };

    if (this.isEditMode && this.data?.id) {
      this.areaService.update(this.data.id, payload).subscribe({
        next: () => {
          alert('Área actualizada con éxito');
          this.dialogRef.close(true);
        },
        error: () => alert('Error al actualizar el área')
      });
    } else {
      this.areaService.create(payload).subscribe({
        next: () => {
          alert('Área creada con éxito');
          this.dialogRef.close(true);
        },
        error: () => alert('Error al crear el área')
      });
    }
  }
}
