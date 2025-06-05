import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { RouteDeliveryService } from '../../../services/routes-delivery.service';
import { DeliveryBranchService } from '../../../services/delivery-branch.service';
import { BranchService } from '../../../services/branch.service';
import { RouteDelivery } from '../../../models/route-delivery.model';
import { DeliveryBranch } from '../../../models/delivery-branch.model';
import { Branch } from '../../../models/branch.model';

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

  constructor(
    private routesDeliveryService: RouteDeliveryService,
    private deliveryBranchService: DeliveryBranchService,
    private branchService: BranchService,
    public dialogRef: MatDialogRef<RouteDayDatailsPage>,
    @Inject(MAT_DIALOG_DATA) public data: { routeDayId: number; routeDayDate: string }
  ) {}

  ngOnInit(): void {
    if (this.data?.routeDayId) {
      this.routesDeliveryService.getByRoutesDayId(this.data.routeDayId).subscribe({
        next: (res) => {
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
                  },
                  error: (err) => console.error('Error al cargar sucursal', err)
                });
              },
              error: (err) => console.error('Error al cargar deliveryBranch', err)
            });
          });
        },
        error: (err) => console.error('Error al cargar deliveries', err)
      });
    } else {
      console.warn('No se recibió data válida en el modal:', this.data);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
