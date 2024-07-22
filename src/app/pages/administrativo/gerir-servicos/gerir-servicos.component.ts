import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule} from '@angular/common';
import { Category } from '../../../Models/Category';
import { Time } from '../../../Models/Time';
import { CategoryServiceService } from '../../../services/category-service.service';
import { TimeServiceService } from '../../../services/time-service.service';
import { HttpClient } from '@angular/common/http';
import { ProfessionalServiceService } from '../../../services/professional-service.service';
import { HeaderRegistrarComponent } from "../../../components/header-registrar/header-registrar.component";

@Component({
  selector: 'app-gerir-servicos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AsyncPipe, HeaderRegistrarComponent],
  templateUrl: './gerir-servicos.component.html',
  styleUrls: ['./gerir-servicos.component.scss']
})
export class GerirServicosComponent implements OnInit {

  professionalForm!: FormGroup;
  categories: Category[] = [];
  times: Time [] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryServiceService,
    private timeService: TimeServiceService,
    private http: HttpClient,
    private professionalService: ProfessionalServiceService

  ) {}

  ngOnInit(): void {
    this.professionalForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailAddress: ['', [Validators.required, Validators.email]],
      PhotoUrl: [''],
      IdCard: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      CategoryId: ['', Validators.required],
      Times: this.fb.array([this.createTime()])
    });

    this.loadCategories();
    this.loadTimes();
  }

  get timesArray(): FormArray {
    return this.professionalForm.get('Times') as FormArray;
  }

  createTime(): FormGroup {
    return this.fb.group({
      TimeId: ['', Validators.required]
    });
  }

  addTime(): void {
    this.timesArray.push(this.createTime());
  }

  removeTime(index: number): void {
    this.timesArray.removeAt(index);
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  loadTimes(): void {
    this.timeService.getTimes().subscribe((times: Time[]) => {
      this.times = times;
    });
  }

  onSubmit(): void {
    if (this.professionalForm.valid) {
      const formData = new FormData();
      const formValue = this.professionalForm.value;

      // Adicionar campos simples ao FormData
      formData.append('FirstName', formValue.FirstName);
      formData.append('LastName', formValue.LastName);
      formData.append('EmailAddress', formValue.EmailAddress);
      formData.append('IdCard', formValue.IdCard);
      formData.append('PhoneNumber', formValue.PhoneNumber.toString());
      formData.append('CategoryId', formValue.CategoryId.toString());

      // Adicionar a foto, se houver
      const photoInput = document.getElementById('photoUrl') as HTMLInputElement;
      if (photoInput && photoInput.files && photoInput.files.length > 0) {
        formData.append('PhotoUrl', photoInput.files[0], photoInput.files[0].name);
      }

      // Adicionar os tempos como um array JSON
      formData.append('Times', JSON.stringify(formValue.Times));

      // Enviar para o backend
      this.professionalService.createProfessioal(formData).subscribe(
        response => {
          
          console.log('Profissional criado com sucesso', response);
        },
        error => {
          console.error('Erro ao criar profissional', error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }
}