import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogoutConfirmDialogComponent } from './logout-confirm-dialog.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isVisible = true;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    if (this.isMobile()) {
      this.isCollapsed = false;
    }
  }

  isMobile(): boolean {
    return window.innerWidth <= 720;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  logout() {
    const dialogRef = this.dialog.open(LogoutConfirmDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        localStorage.removeItem('access_token');
        this.router.navigate(['/']);
      }
    });
  }
}
