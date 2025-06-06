import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CommissionService } from '../../../../services/commission.service';
import { UserService } from '../../../../services/user.service';
import { BranchService } from '../../../../services/branch.service';

import { Commission } from '../../../../models/commission.model';
import { User } from '../../../../models/user.model';
import { Branch } from '../../../../models/branch.model';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-create-edit-commission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './create-edit-comission.page.html',
  styleUrls: ['./create-edit-comission.page.scss']
})
export class CreateEditCommissionPage implements OnInit {
  form: FormGroup;
  isEditMode = false;
  users: User[] = [];
  branches: Branch[] = [];

  constructor(
    private fb: FormBuilder,
    private commissionService: CommissionService,
    private userService: UserService,
    private branchService: BranchService,
    private dialogRef: MatDialogRef<CreateEditCommissionPage>,
    @Inject(MAT_DIALOG_DATA) public data: Commission | null
  ) {
    this.form = this.fb.group({
      branchId: [null, Validators.required],
      userId: [null, Validators.required],
      commissionSale: [0, [Validators.required, Validators.min(0)]],
      volume: [0, [Validators.required, Validators.min(0)]],
      dateCreation: [new Date().toISOString(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue(this.data);
    }
  }

  loadData() {
    this.userService.getAllUsers().subscribe(users => this.users = users);
    this.branchService.getAllBranches().subscribe(branches => this.branches = branches);
  }

  getSafeControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

 submit() {
  if (this.form.invalid) return;

  const raw = this.form.value;

  const commission: Commission = {
    branchId: Number(raw.branchId),
    userId: Number(raw.userId),
    commissionSale: Number(raw.commissionSale),
    volume: raw.volume, // si puede ser decimal, lo puedes dejar como string
    dateCreation: raw.dateCreation || new Date().toISOString()
  };

  const request$ = this.isEditMode && this.data?.id
    ? this.commissionService.update(this.data.id, commission)
    : this.commissionService.create(commission);

  request$.subscribe({
    next: () => {
      alert(`Comisión ${this.isEditMode ? 'actualizada' : 'creada'} con éxito`);
      this.dialogRef.close(true);
    },
    error: () => alert(`Error al ${this.isEditMode ? 'actualizar' : 'crear'} comisión`)
  });
}

}
