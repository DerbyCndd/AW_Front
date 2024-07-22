import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss'
})
export class RegisterModalComponent {

  @Output() registerComplete = new EventEmitter<void>();
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthServiceService) {
    this.registerForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      PhoneNumber: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = new FormData();
      Object.keys(this.registerForm.value).forEach(key => {
        formData.append(key, this.registerForm.get(key)?.value);
      });

      this.authService.register(formData).subscribe(
        (user) => {
          console.log('Usuário registrado com sucesso', user);
          sessionStorage.setItem('isLogged', 'true');
          this.registerComplete.emit();
        },
        (error) => {
          console.error('Erro no registro', error);
          this.errorMessage = error.message;
        }
      );
    }
  }

  close(): void {
    this.registerComplete.emit();
  }

}
