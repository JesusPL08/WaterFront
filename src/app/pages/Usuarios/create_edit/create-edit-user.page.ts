import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProfileService } from '../../../services/profile.service';
import { SalaryService } from '../../../services/salary.service';
import { BranchService } from '../../../services/branch.service';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { Login } from '../../../models/login.models';

import { Profile } from '../../../models/profile.model';
import { Salary } from '../../../models/salary.model';
import { Branch } from '../../../models/branch.model';
import { User } from '../../../models/user.model';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { FormControl } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormFieldComponent  // ✅ Añadir aquí
  ],
  templateUrl: './create-edit-user.page.html',
  styleUrls: ['./create-edit-user.page.scss']
})

export class CreateEditUserPage implements OnInit {
  form: FormGroup;
  profiles: Profile[] = [];
  salaries: Salary[] = [];
  branches: Branch[] = [];
  isEditMode: boolean = false;
  loginUser: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    private profileService: ProfileService,
    private salaryService: SalaryService,
    private branchService: BranchService,
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
        branchId: this.data.branchId
      });

      // Obtener login del usuario
      this.loginService.getByUserId(this.data.id!).subscribe({
        next: (login: Login) => {
          this.loginUser = login.user;
          this.form.patchValue({ user: login.user });
          this.form.get('user')?.disable(); // usuario no editable en edición
        },
        error: () => {
          console.warn('No se pudo cargar el login');
          this.form.get('user')?.disable();
        }
      });

      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
    } else {
      this.form.get('password')?.setValidators(Validators.required);
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  loadDropdownData() {
    this.profileService.getAll().subscribe(p => this.profiles = p);
    this.salaryService.getAll().subscribe(s => this.salaries = s);
    this.branchService.getAllBranches().subscribe(b => this.branches = b);
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
      branchId: raw.branchId ? parseInt(raw.branchId, 10) : null
    };

    const loginPayload = {
      user: this.isEditMode ? this.loginUser : String(raw.user),
      password: String(raw.password),
      userId: 0
    };

    if (this.isEditMode && this.data?.id) {
      this.userService.updateUser(this.data.id, userPayload).subscribe({
        next: () => {
          if (loginPayload.password?.trim()) {
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
    } else {
      this.userService.createUser(userPayload).subscribe({
        next: (createdUser) => {
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
        },
        error: (err) => {
          console.error('Error al crear usuario', err);
          alert('Error al crear usuario');
        }
      });
    }
  }
}
