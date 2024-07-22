import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingServiceService } from '../../services/booking-service.service';
import { CategoryServiceService } from '../../services/category-service.service';
import { ServiceServiceService } from '../../services/service-service.service';
import { ProfessionalServiceService } from '../../services/professional-service.service';
import { TimeServiceService } from '../../services/time-service.service';
import jsPDF from 'jspdf';
import { Category } from '../../Models/Category';
import { Service } from '../../Models/Service';
import { Professional } from '../../Models/Professional';
import { Booking } from '../../Models/Booking';
import { User } from '../../Models/User';
import { UserServiceService } from '../../services/user-service.service';
import { Time } from '../../Models/Time';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  bookingForm!: FormGroup;
  categories: Category[] = [];
  services: Service[] = [];
  professionals: Professional[] = [];
  times: Time[] = [];
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingServiceService,
    private categoryService: CategoryServiceService,
    private serviceService: ServiceServiceService,
    private professionalService: ProfessionalServiceService,
    private timeService: TimeServiceService,
    private userService: UserServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadCategories();
    this.loadUsers();
  }

  initForm() {
    this.bookingForm = this.fb.group({
      Services: this.fb.array([this.createServiceFormGroup()]),
      Price: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
      UserId: ['', Validators.required]
    });
  }

  createServiceFormGroup(): FormGroup {
    return this.fb.group({
      Service: this.fb.group({
        ServiceId: ['', Validators.required],
        Name: [''],
        Price: [0],
        CategoryId: ['', Validators.required]
      }),
      Professional: this.fb.group({
        ProfessionalId: ['', Validators.required],
        FirstName: [''],
        LastName: [''],
      }),
      Time: this.fb.group({
        TimeId: ['', Validators.required],
        Hour: [0],
        Minute: [0]
      }),
      Date: ['', Validators.required]
    });
  }

  get servicesFormArray() {
    return this.bookingForm.get('Services') as FormArray;
  }

  addService() {
    this.servicesFormArray.push(this.createServiceFormGroup());
    this.updateTotalPrice();
  }

  removeService(index: number) {
    this.servicesFormArray.removeAt(index);
    this.updateTotalPrice();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        console.log('Categories loaded:', categories);
      },
      error => console.error('Erro ao carregar categorias:', error)
    );
  }

  onCategoryChange(index: number) {
    const CategoryId = this.servicesFormArray.at(index).get('Service.CategoryId')?.value;
    console.log('Category ID selected:', CategoryId);
    if (CategoryId) {
      this.serviceService.getServicesByCategory(CategoryId).subscribe(
        services => {
          console.log('Services received:', services);
          this.services = services;
          this.servicesFormArray.at(index).get('Service.ServiceId')?.setValue('');
          this.servicesFormArray.at(index).get('Service.Name')?.setValue('');
          this.servicesFormArray.at(index).get('Service.Price')?.setValue(0);
          this.updateTotalPrice();
        },
        error => console.error('Erro ao carregar serviços:', error)
      );
      this.loadProfessionalsByCategory(CategoryId);
    } else {
      this.services = [];
      this.professionals = [];
    }
  }

  loadProfessionalsByCategory(CategoryId: number) {
    this.professionalService.getByCategory(CategoryId).subscribe(
      professionals => {
        console.log('Professionals received:', professionals);
        this.professionals = professionals;
      },
      error => console.error('Erro ao carregar profissionais:', error)
    );
  }

  onServiceChange(index: number) {
    const ServiceId = this.servicesFormArray.at(index).get('Service.ServiceId')?.value;
    console.log('Service ID selected:', ServiceId);
    const selectedService = this.services.find(s => s.ServiceId === ServiceId);
    if (selectedService) {
      this.servicesFormArray.at(index).get('Service.Price')?.setValue(selectedService.Price);
      this.updateTotalPrice();
    }
  }

  onProfessionalChange(index: number) {
    const ProfessionalId = this.servicesFormArray.at(index).get('Professional.ProfessionalId')?.value;
    if (ProfessionalId) {
      this.professionalService.getProfessioalById(ProfessionalId).subscribe(
        professional => {
          this.times = professional.Times;
          console.log('Professional times loaded:', this.times);
        },
        error => console.error('Erro ao carregar horários do profissional:', error)
      );
    }
  }

  updateTotalPrice() {
    const totalPrice = this.servicesFormArray.controls.reduce((sum, control) => {
      return sum + (control.get('Service.Price')?.value || 0);
    }, 0);
    this.bookingForm.get('Price')?.setValue(totalPrice);
    this.cdr.detectChanges();
    console.log('Total price updated:', totalPrice);
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const bookingData = {
        ...this.bookingForm.value,
        Price: this.bookingForm.get('Price')?.value
      };
      console.log('Dados a serem enviados:', JSON.stringify(bookingData, null, 2));
      this.bookingService.createBooking(bookingData).subscribe(
        response => {
          console.log('Booking created successfully:', response);
          this.generatePDF(response);
        },
        error => console.error('Erro ao criar reserva:', error)
      );
    } else {
      console.log('Form is invalid');
    }
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        console.log('Users loaded:', users);
      },
      error => console.error('Erro ao carregar usuários:', error)
    );
  }

  generatePDF(bookingData: Booking) {
    const doc = new jsPDF();
    doc.text('Detalhes da Marcação', 10, 10);

    let yPos = 20;
    doc.text(`Preço Total: R$ ${bookingData.Price.toFixed(2)}`, 10, yPos);
    yPos += 10;
    doc.text(`Nome do Usuário: ${bookingData.User.Username}`, 10, yPos);
    yPos += 10;

    bookingData.Services.forEach((service: any, index: number) => {
      doc.text(`Serviço ${index + 1}:`, 10, yPos);
      yPos += 5;
      doc.text(`Nome do Serviço: ${service.Service.Name}`, 15, yPos);
      yPos += 5;
      doc.text(`Profissional: ${service.Professional.FirstName} ${service.Professional.LastName}`, 15, yPos);
      yPos += 5;
      doc.text(`Data: ${service.Date}`, 15, yPos);
      yPos += 5;
      doc.text(`Hora: ${service.Time.Hour}:${service.Time.Minute < 10 ? '0' + service.Time.Minute : service.Time.Minute}`, 15, yPos);
      yPos += 10;
    });

    doc.save('marcacao.pdf');
    console.log('PDF generated');
  }
}