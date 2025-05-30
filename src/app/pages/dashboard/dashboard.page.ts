import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouteService } from '../../services/route.service';
import { BranchService } from '../../services/branch.service';
import { Route } from '../../models/route.model';
import { Attendance } from '../../models/attendance.model';
import { User } from '../../models/user.model';
import { Branch } from '../../models/branch.model';
import { AttendanceService } from '../../services/attendance.service';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, SidebarComponent, RouterModule],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  todayRoutes: (Route & { branchName?: string })[] = [];
  branches: Branch[] = [];

  users: (User & { presentToday: boolean })[] = [];
  today = new Date().toISOString().split('T')[0];
  constructor(
    private routeService: RouteService,
    private branchService: BranchService,
    private userService: UserService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
        this.loadBranchesAndRoutes();
    this.loadUsersWithAttendance();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    this.branchService.getAllBranches().subscribe(branches => {
      this.branches = branches;

      this.routeService.getAll().subscribe(routes => {
        this.todayRoutes = routes
          .filter(route => route.deliveryDate.startsWith(today))
          .map(route => ({
            ...route,
            branchName: this.branches.find(b => b.id === route.branchId)?.name || 'N/D'
          }));
      });
    });
  }
   loadBranchesAndRoutes() {
    this.branchService.getAllBranches().subscribe(branches => {
      this.branches = branches;
      this.routeService.getAll().subscribe(routes => {
        this.todayRoutes = routes
          .filter(route => route.deliveryDate.startsWith(this.today))
          .map(route => ({
            ...route,
            branchName: this.branches.find(b => b.id === route.branchId)?.name || 'N/D'
          }));
      });
    });
  }

  loadUsersWithAttendance() {
    this.userService.getAllUsers().subscribe(users => {
      this.attendanceService.getAll().subscribe(att => {
        this.users = users.map(user => {
          const attended = att.some(a =>
            a.userId === user.id && a.date.startsWith(this.today)
          );
          return { ...user, presentToday: attended };
        });
      });
    });
  }
}
