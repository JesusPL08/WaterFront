import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteDeliveryService } from '../../../services/routes-delivery.service';
import { RouteDelivery } from '../../../models/route-delivery.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-route-day-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './route-day-datails.page.html',
  styleUrl: './route-day-datails.page.scss'
})
export class RouteDayDatailsPage implements OnInit {
  deliveries: RouteDelivery[] = [];

  constructor(
    private routesDeliveryService: RouteDeliveryService,
    public dialogRef: MatDialogRef<RouteDayDatailsPage>,
    @Inject(MAT_DIALOG_DATA) public data: { routeDayId: number; routeDayDate: string }
  ) {}

  ngOnInit(): void {
    if (this.data.routeDayId) {
      this.routesDeliveryService.getByRoutesDayId(this.data.routeDayId).subscribe({
        next: (res) => (this.deliveries = res),
        error: (err) => console.error('Error al cargar routes-delivery', err)
      });
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}