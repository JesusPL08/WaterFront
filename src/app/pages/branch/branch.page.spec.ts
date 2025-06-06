import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchPage } from './branch.page';

describe('BranchPage', () => {
  let component: BranchPage;
  let fixture: ComponentFixture<BranchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
