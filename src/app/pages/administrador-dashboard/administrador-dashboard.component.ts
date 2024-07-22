import { Component, OnInit } from '@angular/core';
import { HeaderEntrarComponent } from "../../components/header-entrar/header-entrar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Models/User';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-administrador-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, HeaderEntrarComponent],
  templateUrl: './administrador-dashboard.component.html',
  styleUrl: './administrador-dashboard.component.scss'
})
export class AdministradorDashboardComponent implements OnInit {

  userForm!: FormGroup;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      PhotoUrl: [''],
      IdCard: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      Username: ['', Validators.required],
      Role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.loadUsers();
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('Password')?.value === g.get('ConfirmPassword')?.value
      ? null : {'mismatch': true};
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
      Object.keys(this.userForm.value).forEach(key => {
        formData.append(key, this.userForm.get(key)?.value);
      });

      // Tratamento especial para o campo de foto
      const photoInput = document.getElementById('PhotoUrl') as HTMLInputElement;
      if (photoInput && photoInput.files && photoInput.files.length > 0) {
        formData.append('PhotoUrl', photoInput.files[0], photoInput.files[0].name);
      }
      
      this.authService.register(formData).subscribe(
        response => {
          console.log('Usuário criado com sucesso', response);
          this.loadUsers();
          this.userForm.reset();
        },
        error => {
          console.error('Erro ao criar usuário', error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }

  toggleUserStatus(user: User): void {
    const newStatus = user.Status === 'Active' ? 'Inactive' : 'Active';
    this.userService.updateUserStatus(user.UserId, newStatus).subscribe(
      response => {
        console.log('Status do usuário atualizado com sucesso', response);
        user.Status = newStatus;
      },
      error => {
        console.error('Erro ao atualizar status do usuário', error);
      }
    );
  }
}