import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { RouteDeliveryService } from '../../../services/routes-delivery.service';
import { DeliveryBranchService } from '../../../services/delivery-branch.service';
import { BranchService } from '../../../services/branch.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-m-google',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './mgoogle.page.html',
  styleUrl: './mgoogle.page.scss'
})
export class MGooglePage implements OnInit {
  url: string = '';
  cargando = true;
  mensajeError: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { routeDayId: number },
    private dialogRef: MatDialogRef<MGooglePage>,
    private routeDeliveryService: RouteDeliveryService,
    private deliveryBranchService: DeliveryBranchService,
    private branchService: BranchService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const direcciones = await this.obtenerDireccionesPorRouteDay(this.data.routeDayId);

      const direccionesUnicas = Array.from(
        new Map(direcciones.map(d => [d.address, d])).values()
      );

      const encoded = direccionesUnicas
        .map(d => encodeURIComponent(d.address))
        .filter(Boolean);

      if (encoded.length < 2) {
        this.mensajeError = 'Se requieren al menos dos sucursales para exportar la ruta.';
        return;
      }

      this.url = `https://www.google.com/maps/dir/${encoded.join('/')}`;
    } catch (error) {
      console.error('Error al exportar ruta:', error);
      alert('Ocurrió un error al generar la ruta en Google Maps.');
      this.dialogRef.close();
    } finally {
      this.cargando = false;
    }
  }

  abrirGoogleMaps(): void {
    if (this.url) {
      window.open(this.url, '_blank');
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  private async obtenerDireccionesPorRouteDay(routeDayId: number): Promise<{ name: string, address: string }[]> {
    const routeDeliveries = await firstValueFrom(this.routeDeliveryService.getByRoutesDayId(routeDayId));
    const direcciones: { name: string, address: string }[] = [];

    for (const rd of routeDeliveries) {
      const deliveryBranch = await firstValueFrom(this.deliveryBranchService.getById(rd.deliveryBranchId));
      const branch = await firstValueFrom(this.branchService.getBranchById(deliveryBranch.branchId));
      direcciones.push({ name: branch.name, address: branch.address });
    }

    return direcciones;
  }
}
