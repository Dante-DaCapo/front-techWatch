import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNotConnectedComponent } from './layout-not-connected.component';

describe('LayoutNotConnectedComponent', () => {
  let component: LayoutNotConnectedComponent;
  let fixture: ComponentFixture<LayoutNotConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutNotConnectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutNotConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
