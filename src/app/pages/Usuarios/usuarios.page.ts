import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../../services/user.service';
import { BranchService } from '../../services/branch.service';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { CreateEditUserPage } from './create_edit/create-edit-user.page';

import { User } from '../../models/user.model';
import { Branch } from '../../models/branch.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    RouterModule,
    TableComponent
  ],
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss']
})
export class UsuariosPage implements OnInit {
  usuarios: any[] = [];
  branches: Branch[] = [];

  constructor(
    private userService: UserService,
    private branchService: BranchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.branchService.getAllBranches().subscribe(b => this.branches = b);
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.usuarios = users.map(user => ({
          ...user,
          branchName: this.getBranchName(user.branchId),
          hiringDateFormatted: new Date(user.hiringDate).toLocaleDateString()
        }));
      },
      error: err => console.error('Error al obtener usuarios', err)
    });
  }

  getBranchName(branchId: number | null | undefined): string {
    const branch = this.branches.find((b: Branch) => b.id === branchId);
    return branch ? branch.name : 'No asignada';
  }

  abrirModal(user?: User) {
    const dialogRef = this.dialog.open(CreateEditUserPage, {
      width: '600px',
      disableClose: false,
      data: user || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarUsuarios();
    });
  }

  eliminarUsuario(user: User) {
    if (!user.id) return;

    if (confirm(`¿Seguro que deseas eliminar a ${user.name}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => this.cargarUsuarios(),
        error: () => alert('No se pudo eliminar el usuario.')
      });
    }
  }
}
