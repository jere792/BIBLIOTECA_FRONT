import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario = '';
  password = '';

  constructor(private router: Router, private auth: AuthService) {}

  ingresar() {
    if (this.usuario === 'admin' && this.password === '1234') {
      this.auth.login('admin');
      this.router.navigate(['/home']);
    } else if (this.usuario === 'empleado' && this.password === '1234') {
      this.auth.login('empleado');
      this.router.navigate(['/home']);
    } else if (this.usuario === 'cliente' && this.password === '1234') {
      this.auth.login('cliente');
      this.router.navigate(['/home']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
