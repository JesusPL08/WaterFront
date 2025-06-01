import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../models/profile.model';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-create-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent
  ],
  templateUrl: './create-edit-profile.page.html',
  styleUrls: ['./create-edit-profile.page.scss']
})
export class CreateEditProfilePage implements OnInit {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private dialogRef: MatDialogRef<CreateEditProfilePage>,
    @Inject(MAT_DIALOG_DATA) public data: Profile | null
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      rank: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue({
        name: this.data.name,
        rank: this.data.rank
      });
    }
  }

  getSafeControl(name: string): FormControl {
    return (this.form.get(name) as FormControl) ?? new FormControl();
  }

  submit() {
    if (this.form.invalid) return;

    const profile: Profile = {
      name: this.form.value.name,
      rank: Number(this.form.value.rank)
    };

    if (this.isEditMode && this.data?.id) {
      this.profileService.update(this.data.id, profile).subscribe({
        next: () => {
          alert('Perfil actualizado con éxito');
          this.dialogRef.close(true);
        },
        error: () => alert('Error al actualizar perfil')
      });
    } else {
      this.profileService.create(profile).subscribe({
        next: () => {
          alert('Perfil creado con éxito');
          this.dialogRef.close(true);
        },
        error: () => alert('Error al crear perfil')
      });
    }
  }
}
