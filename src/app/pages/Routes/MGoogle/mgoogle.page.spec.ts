import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MGooglePage } from './mgoogle.page';

describe('MGooglePage', () => {
  let component: MGooglePage;
  let fixture: ComponentFixture<MGooglePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MGooglePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MGooglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
