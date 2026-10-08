import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../core/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = false;
  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login(): void {

    // Validate form
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const loginRequest = this.loginForm.getRawValue();

    this.authService.login(loginRequest).subscribe({

      next: response => {

        console.log('Login successful:', response);

        this.loading = false;

        // JWT has already been stored by AuthService
        this.router.navigate(['/dashboard']);
      },

      error: error => {

        console.error('Login failed:', error);

        this.loading = false;

        if (error?.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else if (error?.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage =
            'Unable to connect to the server. Please try again.';
        }
      }
    });
  }
}