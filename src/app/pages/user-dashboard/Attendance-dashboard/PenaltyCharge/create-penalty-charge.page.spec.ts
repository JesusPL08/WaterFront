import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePenaltyChargePage } from './create-penalty-charge.page';

describe('CreatePenaltyChargePage', () => {
  let component: CreatePenaltyChargePage;
  let fixture: ComponentFixture<CreatePenaltyChargePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePenaltyChargePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePenaltyChargePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
