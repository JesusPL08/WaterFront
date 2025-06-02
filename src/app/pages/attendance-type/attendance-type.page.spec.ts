import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTypePage } from './attendance-type.page';

describe('AttendanceTypePage', () => {
  let component: AttendanceTypePage;
  let fixture: ComponentFixture<AttendanceTypePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceTypePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
