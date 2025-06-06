import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBonusPage } from './create-bonus.page';

describe('CreateBonusPage', () => {
  let component: CreateBonusPage;
  let fixture: ComponentFixture<CreateBonusPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBonusPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBonusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
