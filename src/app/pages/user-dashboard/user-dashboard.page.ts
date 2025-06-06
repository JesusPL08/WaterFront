import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/user.model';
import { Profile } from '../../models/profile.model';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialog } from '@angular/material/dialog';
import { CreateAttendancePage } from './Attendance-dashboard/attendance/create-attendance.page';
import { CreateBonusPage } from './Attendance-dashboard/Bonus/create-bonus.page';
import { CreatePenaltyChargePage } from './Attendance-dashboard/PenaltyCharge/create-penalty-charge.page';
import { ViewRegisterPage } from './Attendance-dashboard/Register/view-register.page';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, NgbModalModule, SidebarComponent,RouterModule],
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss']
})
export class UserDashboardComponent implements OnInit {
  users: (User & { selected?: boolean; profileName?: string })[] = [];
  selectedUsers: User[] = [];
  profiles: Profile[] = [];
  action: 'edit' | 'delete' = 'edit';
  currentPage = 1;  
  @ViewChild('actionModal') actionModal: any;

  constructor(
  ) {}

  ngOnInit(): void {

  }


}
