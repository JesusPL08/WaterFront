import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RMAPPage } from './rmap.page';

describe('RMAPPage', () => {
  let component: RMAPPage;
  let fixture: ComponentFixture<RMAPPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RMAPPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RMAPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
