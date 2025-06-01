import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditClientPage } from './create-edit-client.page';

describe('CreateEditClientPage', () => {
  let component: CreateEditClientPage;
  let fixture: ComponentFixture<CreateEditClientPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditClientPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
