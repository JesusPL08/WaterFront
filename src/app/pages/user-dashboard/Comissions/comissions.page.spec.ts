import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissionsPage } from './comissions.page';

describe('ComissionsPage', () => {
  let component: ComissionsPage;
  let fixture: ComponentFixture<ComissionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComissionsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComissionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
