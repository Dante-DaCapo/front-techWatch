import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PinComponent } from '../pin/pin.component';
import { PinService } from '../services/pin/pin.service';
import { Tag, TagService } from '../services/tag/tag.service';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { ViewOverlayComponent } from '../view-overlay/view-overlay.component';

@Component({
  selector: 'app-tag-view',
  standalone: true,
  imports: [PinComponent, RouterLink, ButtonComponent, ViewOverlayComponent],
  templateUrl: './tags-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsViewComponent {
  pins = this.pinService.pins$;

  tags = this.tagService.tags$;

  constructor(private pinService: PinService, private tagService: TagService) {}

  ngOnInit(): void {
    this.pinService.loadPins();
  }

  shoudDisplayTagSection(tag: Tag): boolean {
    return this.pins().some((pin) => pin.tags.includes(tag.name));
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
