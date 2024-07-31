import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService, UserInfo } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { UpdatePasswordComponent } from '../update-password/update-password.component';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ButtonComponent, UpdatePasswordComponent],
  templateUrl: './profile-view.component.html',
})
export class ProfileViewComponent {
  deleteButtonClicked: boolean = false;
  changePasswordClicked: boolean = false;

  constructor(private authService: AuthService) {}

  user$: Observable<UserInfo> = this.authService.getConnectedUserInfos();

  onClickDeletionConfirmed() {
    this.authService.deleteAccount();
  }
}
