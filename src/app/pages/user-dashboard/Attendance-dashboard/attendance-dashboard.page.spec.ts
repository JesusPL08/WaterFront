import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDashboardPage } from './attendance-dashboard.page';

describe('AttendanceDashboardPage', () => {
  let component: AttendanceDashboardPage;
  let fixture: ComponentFixture<AttendanceDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceDashboardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
