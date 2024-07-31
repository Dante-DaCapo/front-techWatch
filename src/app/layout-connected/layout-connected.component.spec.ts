import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutConnectedComponent } from './layout-connected.component';

describe('LayoutConnectedComponent', () => {
  let component: LayoutConnectedComponent;
  let fixture: ComponentFixture<LayoutConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutConnectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
