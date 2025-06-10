import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CostService } from '../../services/cost.service';
import { Cost } from '../../models/cost.model';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-cost-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './cost.page.html',
  styleUrls: ['./cost.page.scss']
})
export class CostPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private costService: CostService
  ) {
    this.form = this.fb.group({
      price: [null, [Validators.required, Validators.min(1)]],
      productId: [null, [Validators.required, Validators.min(1)]],
      units: [null, [Validators.required, Validators.min(1)]]
      // Si luego agregás supplierId, ponelo aquí también.
    });
  }

  ngOnInit(): void {}

  guardarCosto() {
    if (this.form.invalid) return;

    const cost: Cost = this.form.value;
    this.costService.create(cost).subscribe({
      next: () => {
        alert('Costo creado con éxito');
        this.form.reset();
      },
      error: () => alert('Error al crear costo')
    });
  }
}
