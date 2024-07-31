import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PinListComponent } from '../pin-list/pin-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterTagsComponent } from '../filter-tags/filter-tags.component';
import { TagsViewComponent } from '../tags-view/tags-view.component';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { ViewOverlayComponent } from '../view-overlay/view-overlay.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ViewOverlayComponent,
    AsyncPipe,
    PinListComponent,
    MatDialogModule,
    FilterTagsComponent,
    TagsViewComponent,
    ButtonComponent,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
