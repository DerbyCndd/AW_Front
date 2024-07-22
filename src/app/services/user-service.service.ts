import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>('https://localhost:44350/api/users')
      .pipe(
        tap((value) =>
          value.sort((a, b) => a.FirstName.localeCompare(b.FirstName))
        )
      );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`https://localhost:44350/api/users/${id}`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(
      `https://localhost:44350/api/users/username/${username}`
    );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(
      `https://localhost:44350/api/users/email/${email}`
    );
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put<User>(
      `https://localhost:44350/api/users/${id}`,
      userData
    );
  }

  updateUserStatus(id: number, status: string): Observable<any> {
    const body = `"${status}"`;
    return this.http.put<any>(
      `https://localhost:44350/api/users/updateStatus/${id}`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:44350/api/users/${id}`);
  }
}
