import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent {
  changePasswordForm = this.formBuilder.nonNullable.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    newPasswordConfirmation: ['', [Validators.required]],
  });

  onSubmit() {
    if (!this.passwordAndConfirmationMatches) {
      throw new Error('Password and confirmation do not match');
    }

    this.authService.updatePassword(this.changePasswordForm.value);
  }

  get newPassword(): string {
    return this.changePasswordForm.get('newPassword')?.value ?? '';
  }

  get newPasswordConfirmation(): string {
    return this.changePasswordForm.get('newPasswordConfirmation')?.value ?? '';
  }

  get passwordAndConfirmationMatches(): boolean {
    return this.newPassword === this.newPasswordConfirmation;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}
}
