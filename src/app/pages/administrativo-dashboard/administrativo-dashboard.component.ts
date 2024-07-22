import { Component, OnInit } from '@angular/core';
import { Professional } from '../../Models/Professional';
import { Service } from '../../Models/Service';
import { BookingServiceService } from '../../services/booking-service.service';
import { ServiceServiceService } from '../../services/service-service.service';
import { ProfessionalServiceService } from '../../services/professional-service.service';
import { CommonModule } from '@angular/common';
import { HeaderRegistrarComponent } from "../../components/header-registrar/header-registrar.component";

@Component({
  selector: 'app-administrativo-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderRegistrarComponent],
  templateUrl: './administrativo-dashboard.component.html',
  styleUrl: './administrativo-dashboard.component.scss'
})
export class AdministrativoDashboardComponent implements OnInit {

  todayRevenue: number = 0;
  yesterdayRevenue: number = 0;
  currentMonthRevenue: number = 0;
  lastMonthRevenue: number = 0;
  topProfessionals: Professional[] = [];
  leastRequestedService: Service | null = null;

  constructor(
    private bookingService: BookingServiceService,
    private serviceService: ServiceServiceService,
    private professionalService: ProfessionalServiceService
  ) {}

  ngOnInit(): void {
    this.loadRevenue();
    this.loadTopProfessionals();
    this.loadLeastRequestedService();
  }

  loadRevenue(): void {
    this.bookingService.getRevenueForToday().subscribe(
      revenue => this.todayRevenue = revenue,
      error => console.error('Erro ao carregar faturamento de hoje', error)
    );
    this.bookingService.getRevenueForYesterday().subscribe(
      revenue => this.yesterdayRevenue = revenue,
      error => console.error('Erro ao carregar faturamento de ontem', error)
    );
    this.bookingService.getRevenueForCurrentMonth().subscribe(
      revenue => this.currentMonthRevenue = revenue,
      error => console.error('Erro ao carregar faturamento do mês atual', error)
    );
    this.bookingService.getRevenueForLastMonth().subscribe(
      revenue => this.lastMonthRevenue = revenue,
      error => console.error('Erro ao carregar faturamento do mês passado', error)
    );
  }

  loadTopProfessionals(): void {
    this.professionalService.getTop5Professionals().subscribe(
      professionals => this.topProfessionals = professionals,
      error => console.error('Erro ao carregar top profissionais', error)
    );
  }

  loadLeastRequestedService(): void {
    this.serviceService.getLeastRequestedService().subscribe(
      service => this.leastRequestedService = service,
      error => console.error('Erro ao carregar serviço menos solicitado', error)
    );
  }

}
