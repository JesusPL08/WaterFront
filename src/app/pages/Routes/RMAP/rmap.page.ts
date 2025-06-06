import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BranchService } from '../../../services/branch.service';
import { Branch } from '../../../models/branch.model';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryBranchService } from '../../../services/delivery-branch.service';
import { DeliveryBranch } from '../../../models/delivery-branch.model';
import { TicketService } from '../../../services/ticket.service';
import { ticket } from '../../../models/Ticket.model';
import { RouteDeliveryService } from '../../../services/routes-delivery.service';
import { RouteDelivery } from '../../../models/route-delivery.model';

interface SelectedBranch {
  branch: Branch;
  priority: number;
}

@Component({
  selector: 'app-rmap',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './rmap.page.html',
  styleUrl: './rmap.page.scss'
})
export class RMAPPage implements AfterViewInit {
  private map: any;
  private leaflet: any;
  routeDayId: number | null = null;

  branches: Branch[] = [];
  selectedBranches: SelectedBranch[] = [];
  private markerRefs: { [id: number]: any } = {};
  searchTerm: string = '';

  users: User[] = [];
  selectedUserId: number | null = null;

  tickets: ticket[] = [];
  selectedTicketId: number | null = null;

  private defaultIcon: any;
  private selectedIcon: any;

  constructor(
    private branchService: BranchService,
    private userService: UserService,
    private deliveryBranchService: DeliveryBranchService,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private routeDeliveryService: RouteDeliveryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  volverARoutes(): void {
    this.router.navigate(['/Routes']);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const L = await import('leaflet');
    this.leaflet = L;

    this.defaultIcon = L.icon({
      iconUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.selectedIcon = L.icon({
      iconUrl: 'assets/marker-selected.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.initMap();

    const param = this.route.snapshot.paramMap.get('dayId');
    this.routeDayId = param ? parseInt(param, 10) : null;

    this.cargarBranches();
    this.cargarUsuarios();
    this.cargarTickets();
  }

  private cargarBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: branches => {
        // Mapear 'Coordinate' del backend a 'coordinate'
        this.branches = branches.map((b: any) => ({
          ...b,
          coordinate: b.coordinate || b.Coordinate || null
        }));
        this.mostrarEnMapa(this.branches);
      },
      error: err => console.error('Error al cargar sucursales', err)
    });
  }

  private cargarUsuarios(): void {
    this.userService.getAllUsers().subscribe({
      next: users => (this.users = users),
      error: err => console.error('Error al cargar usuarios', err)
    });
  }

  private cargarTickets(): void {
    this.ticketService.getAll().subscribe({
      next: tickets => (this.tickets = tickets),
      error: err => console.error('Error al cargar tickets', err)
    });
  }

  exportarRutaAGoogleMaps(): void {
    const coords = this.selectedBranches
      .map(sb => this.parseAddress(sb.branch.coordinate))
      .filter(Boolean)
      .map(coord => `${coord!.lat},${coord!.lng}`);

    if (coords.length < 2) {
      alert('Selecciona al menos 2 sucursales para generar la ruta.');
      return;
    }

    const url = `https://www.google.com/maps/dir/${coords.join('/')}`;
    window.open(url, '_blank');
  }

  guardarRutaParaEmpleado(): void {
    if (!this.selectedUserId || this.selectedBranches.length === 0 || !this.routeDayId) {
      alert('Selecciona empleado, sucursales, ticket y asegúrate de tener día válido.');
      return;
    }

    this.selectedBranches.forEach((sb) => {
      const delivery: DeliveryBranch = {
        userId: this.selectedUserId!,
        branchId: sb.branch.id!,
        ticketId: this.selectedTicketId!,
        priority: sb.priority,
        status: 1
      };

      this.deliveryBranchService.create(delivery).subscribe({
        next: (createdDelivery) => {
          const routeDelivery: RouteDelivery = {
            deliveryBranchId: createdDelivery.id!,
            routesDayId: this.routeDayId!
          };

          this.routeDeliveryService.create(routeDelivery).subscribe({
            next: () =>
              console.log(
                `Asignado delivery #${createdDelivery.id} a routeDay #${this.routeDayId}`
              ),
            error: err => console.error('Error creando routeDelivery', err)
          });
        },
        error: err => console.error('Error creando deliveryBranch', err)
      });
    });

    alert('Entregas asignadas correctamente.');
  }

  isSelected(id: number): boolean {
    return this.selectedBranches.some(sb => sb.branch.id === id);
  }

  setPriority(sb: SelectedBranch, level: number): void {
    sb.priority = level;
  }

  private initMap(): void {
    this.map = this.leaflet.map('map', {
      center: [20.967, -89.623],
      zoom: 11
    });

    this.leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors'
      })
      .addTo(this.map);
  }

  private mostrarEnMapa(branches: Branch[]): void {
    branches.forEach(branch => {
      const coords = this.parseAddress(branch.coordinate);
      if (!coords) return;

      const marker = this.leaflet
        .marker([coords.lat, coords.lng], { icon: this.defaultIcon })
        .addTo(this.map)
        .bindTooltip(branch.name, { permanent: true, direction: 'top' })
        .on('click', () => this.toggleBranch(branch.id!));

      this.markerRefs[branch.id!] = marker;
    });
  }

  get filteredBranches(): Branch[] {
    const lowerTerm = this.searchTerm.toLowerCase();

    if (this.searchTerm.trim()) {
      return this.branches.filter(branch =>
        branch.name.toLowerCase().includes(lowerTerm)
      );
    }

    return [
      ...this.selectedBranches.map(sb => sb.branch),
      ...this.branches.filter(
        b => !this.selectedBranches.find(sb => sb.branch.id === b.id)
      )
    ];
  }

  public toggleBranch(id: number): void {
    const branch = this.branches.find(b => b.id === id);
    if (!branch) return;

    const coords = this.parseAddress(branch.coordinate);
    if (coords) {
      this.map.setView([coords.lat, coords.lng], 14);
    }

    const idx = this.selectedBranches.findIndex(sb => sb.branch.id === id);
    if (idx >= 0) {
      this.selectedBranches.splice(idx, 1);
      this.markerRefs[id].setIcon(this.defaultIcon);
    } else {
      this.selectedBranches.push({ branch, priority: 1 });
      this.markerRefs[id].setIcon(this.selectedIcon);
    }
  }

  private parseAddress(coordinate: string | null | undefined): { lat: number; lng: number } | null {
    if (!coordinate || typeof coordinate !== 'string') return null;

    const parts = coordinate.split(',').map(p => p.trim());
    if (parts.length !== 2) return null;

    const [latStr, lngStr] = parts;
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    return isNaN(lat) || isNaN(lng) ? null : { lat, lng };
  }
}
