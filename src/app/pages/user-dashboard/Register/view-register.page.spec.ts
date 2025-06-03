import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegisterPage } from './view-register.page';

describe('ViewRegisterPage', () => {
  let component: ViewRegisterPage;
  let fixture: ComponentFixture<ViewRegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRegisterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
