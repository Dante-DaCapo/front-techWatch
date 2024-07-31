import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-layout-connected',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SearchComponent],
  templateUrl: './layout-connected.component.html',
})
export class LayoutConnectedComponent {
  constructor(public authService: AuthService) {}
}
