import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDayDatailsPage } from './route-day-datails.page';

describe('RouteDayDatailsPage', () => {
  let component: RouteDayDatailsPage;
  let fixture: ComponentFixture<RouteDayDatailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteDayDatailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteDayDatailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
