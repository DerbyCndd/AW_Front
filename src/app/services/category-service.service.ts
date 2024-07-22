import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private http = inject(HttpClient) ;
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://localhost:44350/api/categories');
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(
      `https://localhost:44350/api/categories/${id}`
    );
  }

  createCategory(formData: FormData): Observable<any> {
    return this.http.post('https://localhost:44350/api/categories', formData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(
      `https://localhost:44350/api/categories/${id}`
    );
  }

  updateCategoryStatus(id: number, status: string): Observable<any> {
    const body = `"${status}"`;
    return this.http.put<any>(
      `https://localhost:44350/api/categories/updateStatus/${id}`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}