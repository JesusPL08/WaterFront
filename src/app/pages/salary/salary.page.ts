// salary.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { SalaryService } from '../../services/salary.service';
import { Salary } from '../../models/salary.model';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { CreateEditSalaryPage } from './create-edit/create-edit-salary.page';

@Component({
  selector: 'app-salary-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    TableComponent
  ],
  templateUrl: './salary.page.html',
  styleUrls: ['./salary.page.scss']
})
export class SalaryPage implements OnInit {
  salarios: any[] = [];

  constructor(
    private salaryService: SalaryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarSalarios();
  }

  cargarSalarios() {
    this.salaryService.getAll().subscribe({
      next: salaries => {
        this.salarios = salaries.map(s => ({
          ...s,
          createdAtFormatted: new Date(s.createdAt || '').toLocaleDateString()
        }));
      },
      error: err => console.error('Error al cargar salarios', err)
    });
  }

  abrirModal(salary?: Salary) {
    const dialogRef = this.dialog.open(CreateEditSalaryPage, {
      width: '500px',
      disableClose: false,
      data: salary || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarSalarios();
    });
  }

  eliminarSalario(salary: Salary) {
    if (!salary.id) return;

    if (confirm(`¿Seguro que deseas eliminar el salario "${salary.name}"?`)) {
      this.salaryService.delete(salary.id).subscribe({
        next: () => this.cargarSalarios(),
        error: () => alert('No se pudo eliminar el salario.')
      });
    }
  }
}
