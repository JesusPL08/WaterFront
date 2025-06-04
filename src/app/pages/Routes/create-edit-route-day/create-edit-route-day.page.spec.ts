import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditRouteDayPage } from './create-edit-route-day.page';

describe('CreateEditRouteDayPage', () => {
  let component: CreateEditRouteDayPage;
  let fixture: ComponentFixture<CreateEditRouteDayPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditRouteDayPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditRouteDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
