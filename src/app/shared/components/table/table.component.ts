import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() headers: string[] = []; // encabezados en orden
  @Input() rows: any[] = [];       // array de objetos
  @Input() keys: string[] = [];    // nombres de propiedades a renderizar en orden
  @Input() actionsTemplate?: any;  // template opcional para acciones
}
