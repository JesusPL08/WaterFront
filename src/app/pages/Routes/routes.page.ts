import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RouteDayService } from '../../services/route-day.service';
import { RouteDay } from '../../models/route-day.model';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CreateEditRouteDayModal } from './create-edit-route-day/create-edit-route-day.page';
import { FormsModule } from '@angular/forms';
import { RouteDayDatailsPage } from './Route-day-datails/route-day-datails.page';
import { Router } from '@angular/router';
import { RouteDeliveryService } from '../../services/routes-delivery.service';
import { DeliveryBranchService } from '../../services/delivery-branch.service';
import { BranchService } from '../../services/branch.service';
import { firstValueFrom } from 'rxjs';
import { MGooglePage } from './MGoogle/mgoogle.page'; 
@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './routes.page.html',
  styleUrl: './routes.page.scss'
})
export class RoutesPage implements OnInit {
  rutas: RouteDay[] = [];
  rutasFiltradas: RouteDay[] = [];
  filtroFecha: string = '';

  constructor(
    private routeDayService: RouteDayService,
    private dialog: MatDialog,
    private router: Router,
    private routeDeliveryService: RouteDeliveryService,
    private deliveryBranchService: DeliveryBranchService,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.cargarRutas();
  }

  verMapa(ruta: RouteDay): void {
    this.router.navigate(['/RMAP', ruta.id]);
  }

  abrirModal(routeDay?: RouteDay): void {
    const dialogRef = this.dialog.open(CreateEditRouteDayModal, {
      width: '400px',
      data: routeDay || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarRutas();
    });
  }

  cargarRutas(): void {
    this.routeDayService.getAll().subscribe({
      next: (r) => {
        this.rutas = r;
        this.rutasFiltradas = r;
      },
      error: () => console.error('Error al cargar rutas')
    });
  }

  filtrarPorFecha(): void {
    if (!this.filtroFecha) {
      this.rutasFiltradas = this.rutas;
      return;
    }

    this.rutasFiltradas = this.rutas.filter(r =>
      r.routeDay?.startsWith(this.filtroFecha)
    );
  }


async exportarRutaAGoogleMapsDesdeRouteDay(routeDayId: number): Promise<void> {

  this.dialog.open(MGooglePage, {
    width: '600px',
    data: { routeDayId },
    disableClose: false
  });
}

  abrirDetalleEntregas(ruta: RouteDay): void {
    const dialogRef = this.dialog.open(RouteDayDatailsPage, {
      width: '600px',
      data: {
        routeDayId: ruta.id,
        routeDayDate: ruta.routeDay,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // opcional: recargar datos si hubo cambios
      }
    });
  }
}
