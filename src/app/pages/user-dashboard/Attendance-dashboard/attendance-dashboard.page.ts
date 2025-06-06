import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ProfileService } from '../../../services/profile.service';
import { User } from '../../../models/user.model';
import { Profile } from '../../../models/profile.model';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialog } from '@angular/material/dialog';
import { CreateAttendancePage } from './attendance/create-attendance.page';
import { CreateBonusPage } from './Bonus/create-bonus.page';
import { CreatePenaltyChargePage } from './PenaltyCharge/create-penalty-charge.page';
import { ViewRegisterPage } from './Register/view-register.page';


@Component({
  selector: 'app-attendance-dashboard',
  imports: [CommonModule, NgbModalModule, SidebarComponent,NgxPaginationModule],
  standalone: true,
  templateUrl: './attendance-dashboard.page.html',
  styleUrl: './attendance-dashboard.page.scss'
})
export class AttendanceDashboardPage {
 users: (User & { selected?: boolean; profileName?: string })[] = [];
  selectedUsers: User[] = [];
  profiles: Profile[] = [];
  action: 'edit' | 'delete' = 'edit';
  currentPage = 1;  
  @ViewChild('actionModal') actionModal: any;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private modalService: NgbModal,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profileService.getAll().subscribe((profiles) => {
      this.profiles = profiles;
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res.map((u) => {
        const profile = this.profiles.find(p => p.id === u.profileId);
        return {
          ...u,
          selected: false,
          profileName: profile?.name || 'Sin perfil'
        };
      });
    });
  }

  toggleSelection(user: User & { selected?: boolean }): void {
    user.selected = !user.selected;
    this.selectedUsers = this.users.filter((u) => u.selected);
  }

  openActionModal(action: 'edit' | 'delete') {
    this.action = action;
    this.selectedUsers = this.users.filter((u) => u.selected);

    if (this.selectedUsers.length === 0) {
      alert('Selecciona al menos un empleado');
      return;
    }

    this.modalService.open(this.actionModal);
  }

  confirmAction(modal: any): void {
    console.log(`Acción: ${this.action}`, this.selectedUsers);
    modal.close();
  }
    abrirModalPenalty(): void {
  if (this.selectedUsers.length === 0) {
    alert('Selecciona al menos un empleado');
    return;
  }

  this.dialog.open(CreatePenaltyChargePage, {
    maxWidth: '90vw',
    autoFocus: false,
    data: this.selectedUsers
  });
}
    abrirModalRegister(): void {
  if (this.selectedUsers.length === 0) {
    alert('Selecciona al menos un empleado');
    return;
  }

  this.dialog.open(ViewRegisterPage, {
    maxWidth: '90vw',
    autoFocus: false,
    data: this.selectedUsers
  });
}
  abrirModalBonos(): void {
  if (this.selectedUsers.length === 0) {
    alert('Selecciona al menos un empleado');
    return;
  }

  this.dialog.open(CreateBonusPage, {
    maxWidth: '90vw',
    autoFocus: false,
    data: this.selectedUsers
  });
}

  abrirModalAsistencia(): void {
  if (this.selectedUsers.length === 0) {
    alert('Selecciona al menos un empleado');
    return;
  }

  this.dialog.open(CreateAttendancePage, {
    maxWidth: '90vw',          // límite razonable para pantallas grandes
    autoFocus: false,          // evita que fuerce scroll si hay focus
    data: this.selectedUsers
  });

}
}
