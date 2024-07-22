import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../Models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceService {

  constructor(private http:HttpClient) { }
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>('https://localhost:44350/api/services');
  }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`https://localhost:44350/api/services/${id}`);
  }

  getServicesByCategory(category: number): Observable<Service[]> {
    return this.http.get<Service[]>(
      `https://localhost:44350/api/services/getByCategory/${category}`
    );
  }

  createService(formData: FormData): Observable<any> {
    return this.http.post('https://localhost:44350/api/services', formData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:44350/api/services/${id}`);
  }

  updateServiceStatus(id: number, status: string): Observable<any> {
    const body = `"${status}"`;
    return this.http.put<any>(
      `https://localhost:44350/api/services/updateStatus/${id}`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  getMostRequestedService(): Observable<Service> {
    return this.http.get<Service>(
      'https://localhost:44350/api/services/most-requested'
    );
  }

  getLeastRequestedService(): Observable<Service> {
    return this.http.get<Service>(
      'https://localhost:44350/api/services/least-requested'
    );
  }
}
