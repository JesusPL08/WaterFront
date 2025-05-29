import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../../services/user.service';
import { ProfileService } from '../../../services/profile.service';
import { SalaryService } from '../../../services/salary.service';
import { BranchService } from '../../../services/branch.service';
import { Profile } from '../../../models/profile.model';
import { Salary } from '../../../models/salary.model';
import { Branch } from '../../../models/branch.model';

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
    private salaryService: SalaryService,
    private branchService: BranchService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      rfc: ['', Validators.required],
      profileId: [null, Validators.required],
      salaryId: [null, Validators.required],
      hiringDate: ['', Validators.required],
      branchId: [null], // opcional
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData() {
    this.profileService.getAll().subscribe(p => this.profiles = p);
    this.salaryService.getAll().subscribe(s => this.salaries = s);
    this.branchService.getAllBranches().subscribe(b => this.branches = b);
  }

  submit() {
    if (this.form.valid) {
      this.userService.createUser(this.form.value).subscribe({
        next: () => {
          alert('Usuario creado con éxito');
          this.form.reset();
        },
        error: () => {
          alert('Error al crear el usuario');
        }
      });
    }
  }
}
