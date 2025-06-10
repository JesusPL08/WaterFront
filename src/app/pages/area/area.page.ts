import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AreaServices } from '../../services/area.service';
import { area } from '../../models/area.model';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { CreateEditAreaPage } from './Create-edit/create-edit-area.page';

@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    RouterModule,
    TableComponent
  ],
  templateUrl: './area.page.html',
  styleUrls: ['./area.page.scss']
})
export class AreasPage implements OnInit {
  areas: area[] = [];

  constructor(
    private areaService: AreaServices,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarAreas();
  }

  cargarAreas() {
    this.areaService.getAll().subscribe({
      next: data => this.areas = data,
      error: err => console.error('Error al obtener áreas', err)
    });
  }

  abrirModal(area?: area) {
    const dialogRef = this.dialog.open(CreateEditAreaPage, {
      width: '500px',
      data: area || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarAreas();
    });
  }

  eliminarArea(area: area) {
    if (!area.id) return;

    if (confirm(`¿Deseas eliminar el área "${area.name}"?`)) {
      this.areaService.delete(area.id).subscribe({
        next: () => this.cargarAreas(),
        error: () => alert('No se pudo eliminar el área.')
      });
    }
  }
}
