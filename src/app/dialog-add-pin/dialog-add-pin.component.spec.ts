import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPinComponent } from './dialog-add-pin.component';

describe('DialogAddPinComponent', () => {
  let component: DialogAddPinComponent;
  let fixture: ComponentFixture<DialogAddPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddPinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
