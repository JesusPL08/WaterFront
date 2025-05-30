import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
@Component({
  selector: 'app-configuracion',
  imports: [SidebarComponent, CommonModule, RouterModule],
  templateUrl: './configuracion.page.html',
  styleUrl: './configuracion.page.scss'
})
export class ConfiguracionPage {

}
