// entrar.component.ts

import { Component } from '@angular/core';
import { HeaderRegistrarComponent } from '../../components/header-registrar/header-registrar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-entrar',
  standalone: true,
  imports: [HeaderRegistrarComponent, CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.scss'], // Corrected styleUrls
})
export class EntrarComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe({
        next: (user) => {
          console.log('Login bem-sucedido:', user);
          sessionStorage.setItem('isLogged', 'true');
          sessionStorage.setItem('id', String(user.UserId));
          sessionStorage.setItem('username', user.Username);
          sessionStorage.setItem('role', user.Role);
          sessionStorage.setItem('status', user.Status);

          // Debugging logs
          console.log('User Status:', user.Status);
          console.log('User Role:', user.Role);

          if (user.Status === 'pending') {
            if (user.Role === 'administrative') {
              this.toastr.warning('Precisa editar os seu dados de perfíl');
              this.router.navigate(['/administrative/edit-profile']);
            } else {
              this.toastr.warning('A sua conta necessita de Ativação');
            }
          } else {
            switch (user.Role) {
              case 'user':
                console.log('Navigating to home'); // Debug
                this.router.navigate(['']);
                break;
              case 'admin':
                console.log('Navigating to admin'); // Debug
                this.router.navigate(['administrativo']);
                break;
              case 'administrative':
                console.log('Navigating to admin'); // Debug
                this.router.navigate(['administrativo']);
                break;
              case 'professional':
                console.log('Navigating to admin'); // Debug
                this.router.navigate(['administrativo']);
                break;
              default:
                this.toastr.error('Tipo de usuário não reconhecido');
                break;
            }
          }
        },
        error: (error) => {
          console.error('Erro no login:', error);
          this.toastr.error('Identificação ou Palavra passe inválida');
        },
      });
    } else {
      this.toastr.error('Preencha todos campos de forma correta!');
    }
  }
}
