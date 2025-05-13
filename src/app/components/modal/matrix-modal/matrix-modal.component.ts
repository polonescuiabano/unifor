import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {CurriculumMatrix} from '../../../model/CurriculumMatrix';
@Component({
  selector: 'app-matrix-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './matrix-modal.component.html',
  styleUrls: ['./matrix-modal.component.css']
})
export class MatrixModalComponent {
  @Input() isVisible: boolean = false;
  @Input() matrixData: CurriculumMatrix = {
    course: { id: 0, name: '' },
    semester: { id: 0, number: '' },
    subject: { id: 0, name: '' }
  };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CurriculumMatrix>();

  onSave() {
    if (this.matrixData.course && this.matrixData.semester && this.matrixData.subject) {
      this.save.emit(this.matrixData);
    }
  }

  onClose() {
    this.close.emit();
  }
}
