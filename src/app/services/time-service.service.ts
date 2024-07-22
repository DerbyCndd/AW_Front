import { Time } from '../Models/Time';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeServiceService {

  constructor(private http: HttpClient) { }
  getTimes(): Observable<Time[]> {
    return this.http.get<Time[]>('https://localhost:44350/api/times');
  }

  getTimeById(id: number): Observable<Time> {
    return this.http.get<Time>(`https://localhost:44350/api/times/${id}`);
  }
}
