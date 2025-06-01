import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { CreateEditProfilePage } from './create-edit/create-edit-profile.page';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    TableComponent
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  perfiles: any[] = [];

  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarPerfiles();
  }

  cargarPerfiles() {
    this.profileService.getAll().subscribe({
      next: profiles => {
        this.perfiles = profiles.map(p => ({
          ...p,
          createdAtFormatted: new Date(p.createdAt || '').toLocaleDateString()
        }));
      },
      error: err => console.error('Error al cargar perfiles', err)
    });
  }

  abrirModal(profile?: Profile) {
    const dialogRef = this.dialog.open(CreateEditProfilePage, {
      width: '500px',
      disableClose: false,
      data: profile || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarPerfiles();
    });
  }

  eliminarPerfil(profile: Profile) {
    if (!profile.id) return;

    if (confirm(`¿Seguro que deseas eliminar el perfil "${profile.name}"?`)) {
      this.profileService.delete(profile.id).subscribe({
        next: () => this.cargarPerfiles(),
        error: () => alert('No se pudo eliminar el perfil.')
      });
    }
  }
}
