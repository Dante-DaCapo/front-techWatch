import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutNotConnectedComponent } from './layout-not-connected/layout-not-connected.component';
import { LayoutConnectedComponent } from './layout-connected/layout-connected.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutNotConnectedComponent,
    LayoutConnectedComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'front-techWatch';

  constructor(private readonly authService: AuthService) {}

  isConnected(): boolean {
    return this.authService.isLoggedIn;
  }
}
