import {Component, OnInit} from '@angular/core';
import {CurriculumMatrixService} from '../../../services/curriculum-matrix.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-professorandstudent',
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './professorandstudent.component.html',
  styleUrl: './professorandstudent.component.css'
})
export class ProfessorAndStudentComponent implements OnInit {
  courses: any[] = [];
  semesters: any[] = [];
  curriculumMatrix: any[] = [];
  selectedCourse: number | null = null;
  selectedSemester: number | null = null;
  isLoading: boolean = false;
  displayedColumns: string[] = ['subject', 'teacher', 'schedule'];

  constructor(private curriculumMatrixService: CurriculumMatrixService) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadSemesters();
  }

  loadCourses(): void {
    this.curriculumMatrixService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  loadSemesters(): void {
    this.curriculumMatrixService.getSemesters().subscribe((data) => {
      this.semesters = data;
    });
  }

  onCourseChange(): void {
    this.selectedSemester = null;
    this.curriculumMatrix = [];
  }

  onSemesterChange(): void {
    this.curriculumMatrix = [];
  }

  loadCurriculumMatrix(): void {
    if (this.selectedCourse && this.selectedSemester) {
      this.isLoading = true;
      this.curriculumMatrixService
        .getCurriculumMatrix(this.selectedCourse, this.selectedSemester)
        .subscribe(
          (data) => {
            this.curriculumMatrix = data;
            this.isLoading = false;
          },
          (error) => {
            console.error('Erro ao carregar a matriz curricular:', error);
            this.isLoading = false;
          }
        );
    }
  }
}
