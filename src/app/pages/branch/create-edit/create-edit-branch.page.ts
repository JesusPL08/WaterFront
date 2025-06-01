import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BranchService } from '../../../services/branch.service';
import { ClientService } from '../../../services/client.service';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

import { Branch } from '../../../models/branch.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-create-edit-branch',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent
  ],
  templateUrl: './create-edit-branch.page.html',
  styleUrls: ['./create-edit-branch.page.scss']
})
export class CreateEditBranchPage implements OnInit {
  form: FormGroup;
  isEditMode = false;
  clientes: Client[] = [];

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<CreateEditBranchPage>,
    @Inject(MAT_DIALOG_DATA) public data: Branch | null
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      manager: ['', Validators.required],
      salePrice: [0, [Validators.required, Validators.min(0)]],
      razonSocial: ['', Validators.required],
      rfc: ['', Validators.required],
      regimenFiscal: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      usoCfdi: ['', Validators.required],
      clientId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe({
      next: res => this.clientes = res,
      error: () => alert('No se pudieron cargar los clientes')
    });

    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue(this.data);
    }
  }

  getSafeControl(name: string): FormControl {
    return (this.form.get(name) as FormControl) ?? new FormControl();
  }
get clienteOptions() {
  return this.clientes.map(c => ({ label: c.name, value: c.id }));
}

submit() {
  if (this.form.invalid) return;

  const raw = this.form.getRawValue();

  const branch: Branch = {
    ...raw,
    salePrice: parseFloat(raw.salePrice)  // Asegura que sea number, no string
  };

  if (this.isEditMode && this.data?.id) {
    this.branchService.updateBranch(this.data.id, branch).subscribe({
      next: () => {
        alert('Sucursal actualizada con éxito');
        this.dialogRef.close(true);
      },
      error: () => alert('Error al actualizar sucursal')
    });
  } else {
    this.branchService.createBranch(branch).subscribe({
      next: () => {
        alert('Sucursal creada con éxito');
        this.dialogRef.close(true);
      },
      error: () => alert('Error al crear sucursal')
    });
  }
}

}
