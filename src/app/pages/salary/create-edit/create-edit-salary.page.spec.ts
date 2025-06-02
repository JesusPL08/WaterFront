import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSalaryPage } from './create-edit-salary.page';

describe('CreateEditSalaryPage', () => {
  let component: CreateEditSalaryPage;
  let fixture: ComponentFixture<CreateEditSalaryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditSalaryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditSalaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
