import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorandstudentComponent } from './professorandstudent.component';

describe('ProfessorandstudentComponent', () => {
  let component: ProfessorandstudentComponent;
  let fixture: ComponentFixture<ProfessorandstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorandstudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorandstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
