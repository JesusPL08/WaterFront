import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProfileService } from '../../../services/profile.service';
import { SalaryService } from '../../../services/salary.service';
import { BranchService } from '../../../services/branch.service';
import { UserService } from '../../../services/user.service';

import { Profile } from '../../../models/profile.model';
import { Salary } from '../../../models/salary.model';
import { Branch } from '../../../models/branch.model';
import { User } from '../../../models/user.model';

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './create-edit-user.page.html',
  styleUrls: ['./create-edit-user.page.scss']
})
export class CreateEditUserPage implements OnInit {
  form: FormGroup;
  profiles: Profile[] = [];
  salaries: Salary[] = [];
  branches: Branch[] = [];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
    private salaryService: SalaryService,
    private branchService: BranchService,
    private dialogRef: MatDialogRef<CreateEditUserPage>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      rfc: ['', Validators.required],
      profileId: [null, Validators.required],
      salaryId: [null, Validators.required],
      hiringDate: ['', Validators.required],
      branchId: [null],
      user: ['', Validators.required],
      password: [''] // se marca requerida solo si no es edición
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();

    if (this.data) {
      this.isEditMode = true;

      // Precarga datos en el formulario
      this.form.patchValue({
        name: this.data.name,
        phoneNumber: this.data.phoneNumber,
        rfc: this.data.rfc,
        profileId: this.data.profileId,
        salaryId: this.data.salaryId,
        hiringDate: this.data.hiringDate,
        branchId: this.data.branchId,
        user: this.data.user
      });

      // Elimina validación de contraseña si es edición
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
    } else {
      // Si es creación, la contraseña es obligatoria
      this.form.get('password')?.setValidators(Validators.required);
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  loadDropdownData() {
    this.profileService.getAll().subscribe(p => this.profiles = p);
    this.salaryService.getAll().subscribe(s => this.salaries = s);
    this.branchService.getAllBranches().subscribe(b => this.branches = b);
  }

  submit() {
  if (this.form.invalid) return;

  const raw = this.form.value;

  const payload = {
    name: raw.name,
    phoneNumber: raw.phoneNumber,
    rfc: raw.rfc,
    profileId: Number(raw.profileId),
    salaryId: Number(raw.salaryId),
    hiringDate: new Date(raw.hiringDate).toISOString(),
    branchId: raw.branchId ? Number(raw.branchId) : null,
    user: raw.user,
    password: raw.password
  };

  const request = this.isEditMode && this.data?.id
    ? this.userService.updateUser(this.data.id, payload)
    : this.userService.createUser(payload);

  request.subscribe({
    next: () => {
      alert(this.isEditMode ? 'Usuario actualizado con éxito' : 'Usuario creado con éxito');
      this.dialogRef.close(true);
    },
    error: (err) => {
      const msg = err?.error?.message || 'Error al guardar el usuario';
      alert(Array.isArray(msg) ? msg.join('\n') : msg);
    }
  });
}


}
