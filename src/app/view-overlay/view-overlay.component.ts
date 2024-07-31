import { Component, Input } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterOutlet,
  UrlSegment,
} from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { FilterTagsComponent } from '../filter-tags/filter-tags.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPinComponent } from '../dialog-add-pin/dialog-add-pin.component';

@Component({
  selector: 'app-view-overlay',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    FilterTagsComponent,
    MatDialogModule,
    RouterLink,
  ],
  templateUrl: './view-overlay.component.html',
})
export class ViewOverlayComponent {
  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}

  @Input() view!: 'all' | 'tags';

  openDialog() {
    this.dialog.open(DialogAddPinComponent);
  }
}
