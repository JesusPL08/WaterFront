import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { SidebarComponent } from '../../components/sidebar.component';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // ✅ Usar MatDialog
import { CreateEditUserPage } from './create_edit/create-edit-user.page';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterModule],
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss']
})
export class UsuariosPage implements OnInit {
  usuarios: User[] = [];

  constructor(
    private userService: UserService,
    private dialog: MatDialog // ✅ Usar MatDialog aquí
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getAllUsers().subscribe({
      next: users => this.usuarios = users,
      error: err => console.error('Error al obtener usuarios', err)
    });
  }

 abrirModal() {
  const dialogRef = this.dialog.open(CreateEditUserPage, {
    width: '600px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.cargarUsuarios();
    }
  });
}
}
