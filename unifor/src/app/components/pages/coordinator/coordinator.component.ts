import {Component, OnInit} from '@angular/core';
import {CurriculumMatrix} from '../../../model/CurriculumMatrix';
import {MatDialogModule} from '@angular/material/dialog';
import {CoordinatorService} from '../../../services/coordinator.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatrixModalComponent} from '../../modal/matrix-modal/matrix-modal.component';

@Component({
  selector: 'app-coordinator',
  imports: [    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule, MatrixModalComponent],
  templateUrl: './coordinator.component.html',
  styleUrl: './coordinator.component.css'
})
export class CoordinatorComponent implements OnInit{
  curriculumMatrices: CurriculumMatrix[] = [];
  displayedColumns: string[] = ['course', 'semester', 'subject', 'actions'];
  isModalVisible: boolean = false;
  selectedMatrix: CurriculumMatrix | null = null;
  isLoading: boolean = false;

  constructor(
    private adminService: CoordinatorService,
  ) {}

  ngOnInit(): void {
    this.fetchMatrices();
  }

  fetchMatrices(): void {
    this.isLoading = true;
    this.adminService.getCurriculumMatrices().subscribe({
      next: (data) => {
        this.curriculumMatrices = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  openAddModal(): void {
    this.selectedMatrix = {
      course: { id: 0, name: '' },
      semester: { id: 0, number: '' },
      subject: { id: 0, name: '' },
    };
    this.isModalVisible = true;
  }

  openEditModal(matrix: CurriculumMatrix): void {
    this.selectedMatrix = { ...matrix }; // Cria uma cópia para edição
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedMatrix = null;
  }

  saveMatrix(matrix: CurriculumMatrix): void {
    if (matrix.id) {
      this.adminService.updateCurriculumMatrix(matrix.id, matrix).subscribe(() => {
        this.fetchMatrices();
        this.closeModal();
      });
    } else {
      this.adminService.addCurriculumMatrix(matrix).subscribe(() => {
        this.fetchMatrices();
        this.closeModal();
      });
    }
  }

  deleteMatrix(id: number): void {
    if (confirm('Tem certeza que deseja remover esta matriz?')) {
      this.adminService.deleteCurriculumMatrix(id).subscribe(() => {
        this.fetchMatrices();
      });
    }
  }
}
