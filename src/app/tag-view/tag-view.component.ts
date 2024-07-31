import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PinComponent } from '../pin/pin.component';
import { PinService } from '../services/pin/pin.service';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-tag-view',
  standalone: true,
  imports: [PinComponent, RouterLink, ButtonComponent],
  templateUrl: './tag-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagViewComponent {
  pins = this.pinService.pins$;

  tagName!: string;

  constructor(private pinService: PinService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.pins().length === 0) {
      this.pinService.loadPins();
    }
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.tagName = params.get('tagName') || '';
    });
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
