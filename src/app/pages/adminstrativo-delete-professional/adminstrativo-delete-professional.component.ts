import { Component } from '@angular/core';
import { ProfessionalServiceService } from '../../services/professional-service.service';
import { Professional } from '../../Models/Professional';
import { CommonModule } from '@angular/common';
import { HeaderRegistrarComponent } from "../../components/header-registrar/header-registrar.component";

@Component({
  selector: 'app-adminstrativo-delete-professional',
  standalone: true,
  imports: [CommonModule, HeaderRegistrarComponent],
  templateUrl: './adminstrativo-delete-professional.component.html',
  styleUrl: './adminstrativo-delete-professional.component.scss'
})
export class AdminstrativoDeleteProfessionalComponent {
  professionals: Professional[] = [];
  professionalToDelete: Professional | null = null;

  constructor(private professionalService: ProfessionalServiceService) {}

  ngOnInit(): void {
    this.loadProfessionals();
  }

  loadProfessionals(): void {
    this.professionalService.getBProfessioals().subscribe(
      (professionals: Professional[]) => {
        this.professionals = professionals;
      },
      error => {
        console.error('Erro ao carregar profissionais', error);
      }
    );
  }

  confirmDelete(professional: Professional): void {
    this.professionalToDelete = professional;
  }

  cancelDelete(): void {
    this.professionalToDelete = null;
  }

  deleteProfessional(): void {
    if (this.professionalToDelete) {
      this.professionalService.deleteProfessioal(this.professionalToDelete.ProfessionalId).subscribe(
        () => {
          this.professionals = this.professionals.filter(p => p.ProfessionalId !== this.professionalToDelete!.ProfessionalId);
          this.professionalToDelete = null;
        },
        error => {
          console.error('Erro ao excluir profissional', error);
        }
      );
    }
  }
}
