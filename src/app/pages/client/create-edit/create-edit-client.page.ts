import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-create-edit-client',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent
  ],
  templateUrl: './create-edit-client.page.html',
  styleUrls: ['./create-edit-client.page.scss']
})
export class CreateEditClientPage implements OnInit {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<CreateEditClientPage>,
    @Inject(MAT_DIALOG_DATA) public data: Client | null
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue({
        name: this.data.name,
        address: this.data.address
      });
    }
  }

  getSafeControl(name: string): FormControl {
    return (this.form.get(name) as FormControl) ?? new FormControl();
  }

  submit() {
    if (this.form.invalid) return;

    const client: Client = {
      name: this.form.value.name,
      address: this.form.value.address
    };

    if (this.isEditMode && this.data?.id) {
      this.clientService.updateClient(this.data.id, client).subscribe({
        next: () => {
          alert('Cliente actualizado con éxito');
          this.dialogRef.close(true);
        },
        error: () => alert('Error al actualizar cliente')
      });
    } else {
      this.clientService.createClient(client).subscribe({
        next: () => {
          alert('Cliente creado con éxito');
          this.dialogRef.close(true);
        },
        error: () => alert('Error al crear cliente')
      });
    }
  }
}
