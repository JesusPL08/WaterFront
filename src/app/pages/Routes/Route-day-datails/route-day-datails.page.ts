import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { RouteDeliveryService } from '../../../services/routes-delivery.service';
import { DeliveryBranchService } from '../../../services/delivery-branch.service';
import { BranchService } from '../../../services/branch.service';
import { RouteDelivery } from '../../../models/route-delivery.model';
import { DeliveryBranch } from '../../../models/delivery-branch.model';
import { Branch } from '../../../models/branch.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-day-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './route-day-datails.page.html',
  styleUrl: './route-day-datails.page.scss'
})
export class RouteDayDatailsPage implements OnInit {
  deliveries: (RouteDelivery & {
    deliveryBranch?: DeliveryBranch;
    branch?: Branch;
  })[] = [];

  currentPage = 1;
  itemsPerPage = 4;
  cargando = true;

  constructor(
    private routesDeliveryService: RouteDeliveryService,
    private deliveryBranchService: DeliveryBranchService,
    private branchService: BranchService,
    private router: Router,
    public dialogRef: MatDialogRef<RouteDayDatailsPage>,
    @Inject(MAT_DIALOG_DATA) public data: { routeDayId: number; routeDayDate: string }
  ) {}

  ngOnInit(): void {
    if (this.data?.routeDayId) {
      this.routesDeliveryService.getByRoutesDayId(this.data.routeDayId).subscribe({
        next: (res) => {
          if (res.length === 0) {
            this.cargando = false;
            return;
          }

          let entregasCargadas = 0;

          res.forEach((delivery) => {
            this.deliveryBranchService.getById(delivery.deliveryBranchId).subscribe({
              next: (deliveryBranch) => {
                this.branchService.getBranchById(deliveryBranch.branchId).subscribe({
                  next: (branch) => {
                    this.deliveries.push({
                      ...delivery,
                      deliveryBranch,
                      branch
                    });

                    entregasCargadas++;
                    if (entregasCargadas === res.length) {
                      this.cargando = false;
                    }
                  },
                  error: () => this.marcarCargaFallida()
                });
              },
              error: () => this.marcarCargaFallida()
            });
          });
        },
        error: () => this.marcarCargaFallida()
      });
    } else {
      console.warn('No se recibió data válida en el modal:', this.data);
      this.cargando = false;
    }
  }

  marcarCargaFallida(): void {
    console.error('Error durante la carga de entregas.');
    this.cargando = false;
  }

  get paginatedDeliveries() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.deliveries.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.deliveries.length / this.itemsPerPage);
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  paginaSiguiente(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  verMapaYcerrar(): void {
    this.dialogRef.close();
    this.router.navigate(['/RMAP', this.data.routeDayId]);
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  getPriorityClass(priority?: number): string {
    switch (priority) {
      case 1: return 'priority-low';
      case 2: return 'priority-medium';
      case 3: return 'priority-high';
      default: return 'priority-unknown';
    }
  }

  eliminarEntrega(entrega: RouteDelivery & { deliveryBranch?: DeliveryBranch; branch?: Branch }) {
    if (!entrega.id || !entrega.deliveryBranch?.id) {
      console.error('IDs inválidos para eliminar');
      return;
    }

    if (!confirm('¿Estás seguro que deseas eliminar esta entrega?')) {
      return;
    }

    this.routesDeliveryService.delete(entrega.id).subscribe({
      next: () => {
        this.deliveryBranchService.delete(entrega.deliveryBranch!.id!).subscribe({
          next: () => {
            this.deliveries = this.deliveries.filter(d => d.id !== entrega.id);
            if (this.paginatedDeliveries.length === 0 && this.currentPage > 1) {
              this.currentPage--;
            }
          },
          error: (err) => console.error('Error al eliminar DeliveryBranch', err)
        });
      },
      error: (err) => console.error('Error al eliminar RouteDelivery', err)
    });
  }
}
