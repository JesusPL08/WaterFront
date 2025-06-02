import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAttendanceTypePage } from './create-edit-attendance-type.page';

describe('CreateEditAttendanceTypePage', () => {
  let component: CreateEditAttendanceTypePage;
  let fixture: ComponentFixture<CreateEditAttendanceTypePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditAttendanceTypePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditAttendanceTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
