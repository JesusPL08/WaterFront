import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { BranchService } from '../../services/branch.service';
import { ClientService } from '../../services/client.service';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { CreateEditBranchPage } from './create-edit/create-edit-branch.page';

import { Branch } from '../../models/branch.model';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-branch-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    TableComponent
  ],
  templateUrl: './branch.page.html',
  styleUrls: ['./branch.page.scss']
})
export class BranchPage implements OnInit {
  sucursales: any[] = [];
  clientes: Client[] = [];

  constructor(
    private branchService: BranchService,
    private clientService: ClientService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(clientes => {
      this.clientes = clientes;
      this.cargarSucursales();
    });
  }

  cargarSucursales() {
    this.branchService.getAllBranches().subscribe({
      next: branches => {
        this.sucursales = branches.map(b => ({
          ...b,
          clientName: this.getClientName(b.clientId),
          createdAtFormatted: new Date(b.createdAt || '').toLocaleDateString()
        }));
      },
      error: err => console.error('Error al cargar sucursales', err)
    });
  }

  getClientName(clientId: number): string {
    const client = this.clientes.find(c => c.id === clientId);
    return client ? client.name : 'No asignado';
  }

  abrirModal(branch?: Branch) {
    const dialogRef = this.dialog.open(CreateEditBranchPage, {
      width: '800px',
      disableClose: false,
      data: branch || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarSucursales();
    });
  }

  eliminar(branch: Branch) {
    if (!branch.id) return;

    if (confirm(`¿Seguro que deseas eliminar la sucursal "${branch.name}"?`)) {
      this.branchService.deleteBranch(branch.id).subscribe({
        next: () => this.cargarSucursales(),
        error: () => alert('No se pudo eliminar la sucursal.')
      });
    }
  }
}
