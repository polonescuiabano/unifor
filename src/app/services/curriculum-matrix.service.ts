import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurriculumMatrixService {
  private apiUrl = `${environment.apiBaseUrl}/student-professor`;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }

  getSemesters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/semesters`);
  }

  getCurriculumMatrix(courseId: number, semesterId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/list_matrix/${courseId}/${semesterId}`
    );
  }
}
