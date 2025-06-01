import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditBranchPage } from './create-edit-branch.page';

describe('CreateEditBranchPage', () => {
  let component: CreateEditBranchPage;
  let fixture: ComponentFixture<CreateEditBranchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditBranchPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditBranchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
