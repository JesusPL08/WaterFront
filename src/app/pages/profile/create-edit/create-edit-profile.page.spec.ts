import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProfilePage } from './create-edit-profile.page';

describe('CreateEditProfilePage', () => {
  let component: CreateEditProfilePage;
  let fixture: ComponentFixture<CreateEditProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditProfilePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
