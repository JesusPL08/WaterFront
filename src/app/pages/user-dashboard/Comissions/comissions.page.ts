import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

import { CommissionService } from '../../../services/commission.service';
import { UserService } from '../../../services/user.service';
import { BranchService } from '../../../services/branch.service';

import { Commission } from '../../../models/commission.model';
import { User } from '../../../models/user.model';
import { Branch } from '../../../models/branch.model';

import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { CreateEditCommissionPage } from './Create-edit/create-edit-comission.page'; // Corrige nombre y ruta

// Extiende el modelo Commission para incluir campos computados
interface CommissionView extends Commission {
  userName: string;
  branchName: string;
  createdAtFormatted: string;
}

@Component({
  selector: 'app-commission-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    TableComponent
  ],
  templateUrl: './comissions.page.html',
  styleUrls: ['./comissions.page.scss']
})
export class CommissionPage implements OnInit {
  comisiones: CommissionView[] = [];
  usersMap = new Map<number, string>();
  branchesMap = new Map<number, string>();

  constructor(
    private commissionService: CommissionService,
    private userService: UserService,
    private branchService: BranchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    forkJoin({
      users: this.userService.getAllUsers(),
      branches: this.branchService.getAllBranches()
    }).subscribe({
      next: ({ users, branches }) => {
        users.forEach(user => this.usersMap.set(user.id!, user.name));
        branches.forEach(branch => this.branchesMap.set(branch.id!, branch.name));
        this.cargarComisiones();
      },
      error: err => console.error('Error al cargar usuarios o sucursales', err)
    });
  }

  cargarComisiones(): void {
    this.commissionService.getAll().subscribe({
      next: commissions => {
        this.comisiones = commissions.map(c => ({
          ...c,
          userName: this.usersMap.get(c.userId) || 'Desconocido',
          branchName: this.branchesMap.get(c.branchId) || 'Desconocido',
          createdAtFormatted: new Date(c.createdAt || '').toLocaleDateString()
        }));
      },
      error: err => console.error('Error al cargar comisiones', err)
    });
  }

  abrirModal(commission?: Commission): void {
    const dialogRef = this.dialog.open(CreateEditCommissionPage, {
      width: '600px',
      disableClose: false,
      data: commission || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarComisiones();
    });
  }

  eliminarComision(commission: CommissionView): void {
    if (!commission.id) return;

    if (confirm(`¿Seguro que deseas eliminar esta comisión del empleado "${commission.userName}"?`)) {
      this.commissionService.delete(commission.id).subscribe({
        next: () => this.cargarComisiones(),
        error: () => alert('No se pudo eliminar la comisión.')
      });
    }
  }
}
