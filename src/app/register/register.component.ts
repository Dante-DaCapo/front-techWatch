import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registrationForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirmation: ['', [Validators.required]],
  });

  onSubmit() {
    if (!this.passwordAndConfirmationMatches) {
      // TODO - How to display error messages
      throw new Error('Password and confirmation do not match');
    }
    this.authService.register(this.registrationForm.value);
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  get password() {
    return this.registrationForm.get('password');
  }

  get passwordConfirmation() {
    return this.registrationForm.get('passwordConfirmation');
  }

  get passwordAndConfirmationMatches() {
    return this.password?.value === this.passwordConfirmation?.value;
  }
}
