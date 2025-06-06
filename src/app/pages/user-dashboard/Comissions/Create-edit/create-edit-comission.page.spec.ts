import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditComissionPage } from './create-edit-comission.page';

describe('CreateEditComissionPage', () => {
  let component: CreateEditComissionPage;
  let fixture: ComponentFixture<CreateEditComissionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditComissionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditComissionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
