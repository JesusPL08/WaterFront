import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ClientService } from '../../services/client.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { CreateEditClientPage } from './create-edit/create-edit-client.page';

import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TableComponent
  ],
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss']
})
export class ClientPage implements OnInit {
  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: clients => this.clients = clients,
      error: err => console.error('Error al cargar clientes', err)
    });
  }

  openModal(client?: Client) {
    const dialogRef = this.dialog.open(CreateEditClientPage, {
      width: '500px',
      data: client || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadClients();
    });
  }

  deleteClient(client: Client) {
    if (!client.id) return;
    if (confirm(`¿Seguro que deseas eliminar a ${client.name}?`)) {
      this.clientService.deleteClient(client.id).subscribe({
        next: () => this.loadClients(),
        error: () => alert('No se pudo eliminar el cliente.')
      });
    }
  }
}
