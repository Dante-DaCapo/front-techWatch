import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pin } from '../services/pin/pin.service';

@Component({
  selector: 'app-pin',
  standalone: true,
  imports: [],
  templateUrl: './pin.component.html',
})
export class PinComponent {
  @Input() pin!: Pin;
  
  @Output() pinDeleted: EventEmitter<number> = new EventEmitter();

  deletePin() {
    this.pinDeleted.emit(this.pin.id);
  } 

  openLinkInNewTab() {
    window.open(this.pin.sourceUrl, "_blank");
  }
}
