import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../Models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http: HttpClient) {


  }
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>('https://localhost:44350/api/bookings');
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`https://localhost:44350/api/bookings/${id}`);
  }

  createBooking(booking: Booking): Observable<any> {
    return this.http.post('https://localhost:44350/api/bookings', booking);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:44350/api/bookings/${id}`);
  }

  updateBooking(id: number, bookingData: Booking): Observable<any> {
    return this.http.put<any>(
      `https://localhost:44350/api/bookings/${id}`,
      bookingData
    );
  }

  updateBookingStatus(id: number, status: string): Observable<any> {
    const body = `"${status}"`;
    return this.http.put<any>(
      `https://localhost:44350/api/bookings/updateStatus/${id}`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  getRevenueForToday(): Observable<number> {
    return this.http.get<number>(
      'https://localhost:44350/api/bookings/revenue/today'
    );
  }

  getRevenueForYesterday(): Observable<number> {
    return this.http.get<number>(
      'https://localhost:44350/api/bookings/revenue/yesterday'
    );
  }

  getRevenueForCurrentMonth(): Observable<number> {
    return this.http.get<number>(
      'https://localhost:44350/api/bookings/revenue/current-month'
    );
  }

  getRevenueForLastMonth(): Observable<number> {
    return this.http.get<number>(
      'https://localhost:44350/api/bookings/revenue/last-month'
    );
  }
}
