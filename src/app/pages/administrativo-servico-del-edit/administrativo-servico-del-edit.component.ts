import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../Models/Category';
import { Service } from '../../Models/Service';
import { ServiceServiceService } from '../../services/service-service.service';
import { CategoryServiceService } from '../../services/category-service.service';
import { HeaderRegistrarComponent } from "../../components/header-registrar/header-registrar.component";

@Component({
  selector: 'app-administrativo-servico-del-edit',
  standalone: true,
  imports: [CommonModule, HeaderRegistrarComponent],
  templateUrl: './administrativo-servico-del-edit.component.html',
  styleUrl: './administrativo-servico-del-edit.component.scss'
})
export class AdministrativoServicoDelEditComponent implements OnInit {

  services: Service[] = [];
  categories: Category[] = [];

  constructor(
    private serviceService: ServiceServiceService,
    private categoryService: CategoryServiceService
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadCategories();
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe(
      (services: Service[]) => {
        this.services = services;
      },
      error => console.error('Erro ao carregar serviços', error)
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      error => console.error('Erro ao carregar categorias', error)
    );
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.CategoryId === categoryId);
    return category ? category.Name : 'N/A';
  }

  deleteService(serviceId: number): void {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      this.serviceService.deleteCategory(serviceId).subscribe(
        response => {
          console.log('Serviço excluído com sucesso', response);
          this.loadServices(); // Recarrega a lista após a exclusão
        },
        error => console.error('Erro ao excluir serviço', error)
      );
    }
  }
}
