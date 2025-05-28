import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      user: [''],
      password: ['']
    });
  }

 mensaje: string = '';
esError: boolean = false;

login() {
  const { user, password } = this.form.value;

  this.authService.login(user, password).subscribe({
    next: () => {
      this.mensaje = 'Acceso correcto. Redirigiendo...';
      this.esError = false;

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);
    },
    error: () => {
      this.mensaje = 'Credenciales incorrectas. Intenta de nuevo.';
      this.esError = true;
    }
  });
}

}
