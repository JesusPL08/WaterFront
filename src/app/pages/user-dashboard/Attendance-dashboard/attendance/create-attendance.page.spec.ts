import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttendancePage } from './create-attendance.page';

describe('CreateAttendancePage', () => {
  let component: CreateAttendancePage;
  let fixture: ComponentFixture<CreateAttendancePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAttendancePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
