import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProfileService } from '../../../services/profile.service';
import { SalaryService } from '../../../services/salary.service';
import { BranchService } from '../../../services/branch.service';
import { AreaServices } from '../../../services/area.service';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { Login } from '../../../models/login.models';

import { Profile } from '../../../models/profile.model';
import { Salary } from '../../../models/salary.model';
import { Branch } from '../../../models/branch.model';
import { User } from '../../../models/user.model';
import { area } from '../../../models/area.model';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormFieldComponent,
    FormsModule
  ],
  templateUrl: './create-edit-user.page.html',
  styleUrls: ['./create-edit-user.page.scss']
})

export class CreateEditUserPage implements OnInit {
  form: FormGroup;
  profiles: Profile[] = [];
  salaries: Salary[] = [];
  branches: Branch[] = [];
  areas: area[] = [];
  isEditMode: boolean = false;
  loginUser: string = '';
  crearLogin: boolean = false;
  tieneLogin: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    private profileService: ProfileService,
    private salaryService: SalaryService,
    private branchService: BranchService,
    private areaServices: AreaServices,
    private dialogRef: MatDialogRef<CreateEditUserPage>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      rfc: ['', Validators.required],
      profileId: [null, Validators.required],
      salaryId: [null, Validators.required],
      hiringDate: ['', Validators.required],
      branchId: [null],
      areaId: [null],
      user: ['', Validators.required],
      password: ['']
    });
  }

ngOnInit(): void {
  this.loadDropdownData();

  if (this.data) {
    this.isEditMode = true;

    this.form.patchValue({
      name: this.data.name,
      phoneNumber: this.data.phoneNumber,
      rfc: this.data.rfc,
      profileId: this.data.profileId,
      salaryId: this.data.salaryId,
      hiringDate: this.data.hiringDate
        ? new Date(this.data.hiringDate).toISOString().split('T')[0]
        : '',
      branchId: this.data.branchId,
      areaId: this.data.areaId
    });

    this.loginService.getByUserId(this.data.id!).subscribe({
      next: (login: Login) => {
        this.tieneLogin = true;
        this.crearLogin = true;
        this.loginUser = login.user;
        this.form.patchValue({ user: login.user });
        this.form.get('user')?.disable();
        this.actualizarValidadoresLogin();
      },
      error: () => {
        this.tieneLogin = false;
        this.crearLogin = false;
        this.actualizarValidadoresLogin();
      }
    });
  } else {
    this.actualizarValidadoresLogin();
  }
}

  loadDropdownData() {
    this.profileService.getAll().subscribe(p => this.profiles = p);
    this.salaryService.getAll().subscribe(s => this.salaries = s);
    this.branchService.getAllBranches().subscribe(b => this.branches = b);
    this.areaServices.getAll().subscribe(a => this.areas = a);
  }
getSafeControl(name: string): FormControl {
  return (this.form.get(name) as FormControl) ?? new FormControl();
}
get profileOptions() {
  return this.profiles.map(p => ({ label: p.name, value: p.id }));
}

get salaryOptions() {
  return this.salaries.map(s => ({ label: s.name, value: s.id }));
}

get branchOptions() {
  return this.branches.map(b => ({ label: b.name, value: b.id }));
}
get AreaOptions() {
  return this.areas.map(a => ({ label: a.name, value: a.id }));
}

submit() {
  if (this.form.invalid) return;

  const raw = this.form.getRawValue();

  const userPayload = {
    name: String(raw.name),
    phoneNumber: String(raw.phoneNumber),
    rfc: String(raw.rfc),
    profileId: parseInt(raw.profileId, 10),
    salaryId: parseInt(raw.salaryId, 10),
    hiringDate: new Date(raw.hiringDate).toISOString(),
    branchId: raw.branchId ? parseInt(raw.branchId, 10) : null,
    areaId: raw.areaId ? parseInt(raw.areaId, 10) : null
  };

  const loginPayload = {
    user: this.isEditMode ? this.loginUser : String(raw.user),
    password: String(raw.password),
    userId: 0
  };

  // 🔧 EDITAR
  if (this.isEditMode && this.data?.id) {
    this.userService.updateUser(this.data.id, userPayload).subscribe({
      next: () => {
        if (this.crearLogin && loginPayload.password?.trim()) {
          this.loginService.updatePasswordByUserId(this.data!.id!, loginPayload.password).subscribe({
            next: () => {
              alert('Usuario actualizado con nueva contraseña');
              this.dialogRef.close(true);
            },
            error: () => alert('Error al actualizar contraseña')
          });
        } else {
          alert('Usuario actualizado con éxito');
          this.dialogRef.close(true);
        }
      },
      error: () => alert('Error al actualizar usuario')
    });

  // 🔧 CREAR
  } else {
    this.userService.createUser(userPayload).subscribe({
      next: (createdUser) => {
        if (this.crearLogin) {
          this.loginService.create({
            ...loginPayload,
            userId: createdUser.id!
          }).subscribe({
            next: () => {
              alert('Usuario creado con éxito');
              this.dialogRef.close(true);
            },
            error: () => alert('Usuario creado, pero error al crear login')
          });
        } else {
          alert('Usuario creado sin login');
          this.dialogRef.close(true);
        }
      },
      error: (err) => {
        console.error('Error al crear usuario', err);
        alert('Error al crear usuario');
      }
    });
  }
}
actualizarValidadoresLogin() {
  const userCtrl = this.form.get('user');
  const passCtrl = this.form.get('password');

  if (this.crearLogin) {
    userCtrl?.setValidators(Validators.required);
    if (!this.isEditMode) {
      passCtrl?.setValidators(Validators.required);
    } else {
      passCtrl?.clearValidators(); // opcional, depende de tu lógica
    }
  } else {
    userCtrl?.clearValidators();
    passCtrl?.clearValidators();
  }

  userCtrl?.updateValueAndValidity();
  passCtrl?.updateValueAndValidity();
}

}
