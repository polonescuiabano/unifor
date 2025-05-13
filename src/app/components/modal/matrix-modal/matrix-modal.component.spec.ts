import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixModalComponent } from './matrix-modal.component';

describe('MatrixModalComponent', () => {
  let component: MatrixModalComponent;
  let fixture: ComponentFixture<MatrixModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
