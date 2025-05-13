import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurriculumMatrix} from '../model/CurriculumMatrix';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {

  private apiUrl = `${environment.apiBaseUrl}/coordinator`;

  constructor(private http: HttpClient) {}

  getCurriculumMatrices(): Observable<CurriculumMatrix[]> {
    return this.http.get<CurriculumMatrix[]>(this.apiUrl);
  }

  addCurriculumMatrix(matrix: CurriculumMatrix): Observable<CurriculumMatrix> {
    return this.http.post<CurriculumMatrix>(this.apiUrl, matrix);
  }

  updateCurriculumMatrix(id: number, matrix: CurriculumMatrix): Observable<CurriculumMatrix> {
    return this.http.put<CurriculumMatrix>(`${this.apiUrl}/${id}`, matrix);
  }

  deleteCurriculumMatrix(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
