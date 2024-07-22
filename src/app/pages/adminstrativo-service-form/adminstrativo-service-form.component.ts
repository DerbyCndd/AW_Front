import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CategoryServiceService } from '../../services/category-service.service';
import { Category } from '../../Models/Category';
import { ProfessionalServiceService } from '../../services/professional-service.service';
import { ServiceServiceService } from '../../services/service-service.service';
import { HeaderRegistrarComponent } from "../../components/header-registrar/header-registrar.component";

@Component({
  selector: 'app-adminstrativo-service-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderRegistrarComponent],
  templateUrl: './adminstrativo-service-form.component.html',
  styleUrls: ['./adminstrativo-service-form.component.scss']
})
export class AdminstrativoServiceFormComponent implements OnInit {
  serviceForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private categoryService: CategoryServiceService,
    private service: ServiceServiceService,
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Image: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(0)]],
      EstimatedTime: ['', [Validators.required, Validators.min(1)]],
      CategoryId: ['', Validators.required]
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const formData = new FormData();
      const formValue = this.serviceForm.value;

      // Adicionar campos ao FormData
      Object.keys(formValue).forEach(key => {
        if (key !== 'Image') {
          formData.append(key, formValue[key]);
        }
      });

      // Adicionar a imagem, se houver
      const imageInput = document.getElementById('Image') as HTMLInputElement;
      if (imageInput && imageInput.files && imageInput.files.length > 0) {
        formData.append('Image', imageInput.files[0], imageInput.files[0].name);
      }

      // Enviar para o backend
      this.service.createService(formData).subscribe(
        response => {
          console.log('Serviço criado com sucesso', response);
          // Adicione aqui a lógica para lidar com a resposta bem-sucedida
        },
        error => {
          console.error('Erro ao criar serviço', error);
          // Adicione aqui a lógica para lidar com erros
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }
}