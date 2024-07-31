import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PinService } from '../services/pin/pin.service';
import { PinComponent } from '../pin/pin.component';
import { TagService } from '../services/tag/tag.service';

@Component({
  selector: 'app-pin-list',
  standalone: true,
  imports: [PinComponent],
  templateUrl: './pin-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinListComponent {
  pins = this.pinService.pins$;

  tagSelected = this.tagService.selectedTag$;

  constructor(private pinService: PinService, private tagService: TagService) {}

  ngOnInit(): void {
    this.pinService.loadPins();
  }

  removePinFromList(pinId: number) {
    this.pinService.deletePin(pinId).subscribe((success) => {
      if (success) {
        console.log('Pin deleted successfully');
      } else {
        console.error('Failed to delete pin');
      }
    });
  }
}
