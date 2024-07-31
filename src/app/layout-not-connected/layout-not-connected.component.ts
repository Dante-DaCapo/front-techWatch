import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-not-connected',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-not-connected.component.html',
})
export class LayoutNotConnectedComponent {}
