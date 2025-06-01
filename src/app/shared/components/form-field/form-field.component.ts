import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Calendar } from 'primeng/calendar';
import { InputTextarea } from 'primeng/inputtextarea';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    DropdownModule,
    Calendar,
    InputTextarea
  ],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type: 'text' | 'number' | 'password' | 'select' | 'date' | 'textarea' = 'text';
  @Input() options: { label: string; value: any }[] = [];
  @Input() placeholder: string = '';
  @Input() readonly = false;
}
