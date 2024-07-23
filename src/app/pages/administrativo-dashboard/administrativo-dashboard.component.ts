import { Component, OnInit } from '@angular/core';
import { Professional } from '../../Models/Professional';
import { Service } from '../../Models/Service';
import { Booking } from '../../Models/Booking';
import { BookingServiceService } from '../../services/booking-service.service';
import { ServiceServiceService } from '../../services/service-service.service';
import { ProfessionalServiceService } from '../../services/professional-service.service';
import { CommonModule } from '@angular/common';
import { HeaderRegistrarComponent } from "../../components/header-registrar/header-registrar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrativo-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderRegistrarComponent, FormsModule],
  templateUrl: './administrativo-dashboard.component.html',
  styleUrl: './administrativo-dashboard.component.scss'
})
export class AdministrativoDashboardComponent implements OnInit {
  TodayRevenue: number = 0;
  YesterdayRevenue: number = 0;
  CurrentMonthRevenue: number = 0;
  LastMonthRevenue: number = 0;
  TopProfessionals: Professional[] = [];
  LeastRequestedService: Service | null = null;
  Bookings: Booking[] = [];

  constructor(
    private bookingService: BookingServiceService,
    private serviceService: ServiceServiceService,
    private professionalService: ProfessionalServiceService
  ) {}

  ngOnInit(): void {
    this.loadRevenue();
    this.loadTopProfessionals();
    this.loadLeastRequestedService();
    this.loadBookings();
  }

  loadRevenue(): void {
    this.bookingService.getRevenueForToday().subscribe(
      revenue => this.TodayRevenue = revenue,
      error => console.error('Erro ao carregar faturamento de hoje', error)
    );
    this.bookingService.getRevenueForYesterday().subscribe(
      revenue => this.YesterdayRevenue = revenue,
      error => console.error('Erro ao carregar faturamento de ontem', error)
    );
    this.bookingService.getRevenueForCurrentMonth().subscribe(
      revenue => this.CurrentMonthRevenue = revenue,
      error => console.error('Erro ao carregar faturamento do mês atual', error)
    );
    this.bookingService.getRevenueForLastMonth().subscribe(
      revenue => this.LastMonthRevenue = revenue,
      error => console.error('Erro ao carregar faturamento do mês passado', error)
    );
  }

  loadTopProfessionals(): void {
    this.professionalService.getTop5Professionals().subscribe(
      professionals => this.TopProfessionals = professionals,
      error => console.error('Erro ao carregar top profissionais', error)
    );
  }

  loadLeastRequestedService(): void {
    this.serviceService.getLeastRequestedService().subscribe(
      service => this.LeastRequestedService = service,
      error => console.error('Erro ao carregar serviço menos solicitado', error)
    );
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe(
      bookings => this.Bookings = bookings,
      error => console.error('Erro ao carregar marcações', error)
    );
  }

  updateBookingStatus(booking: Booking, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value;
    this.bookingService.updateBookingStatus(booking.BookingId, newStatus).subscribe(
      () => {
        booking.Status = newStatus;
        console.log('Status da marcação atualizado com sucesso');
      },
      error => console.error('Erro ao atualizar status da marcação', error)
    );
  }
}