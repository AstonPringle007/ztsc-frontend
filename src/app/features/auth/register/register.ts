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
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../core/auth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = false;
  errorMessage = '';
  successMessage = '';

  registerForm = this.fb.nonNullable.group({
    username: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],

    role: ['PROCUREMENT', Validators.required]
  });

  register(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request = this.registerForm.getRawValue();

    this.authService.register(request).subscribe({

      next: response => {

        console.log('Registration successful:', response);

        this.loading = false;

        this.successMessage =
          'Registration successful. Redirecting to login...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },

      error: error => {

        console.error('Registration failed:', error);

        this.loading = false;

        this.errorMessage =
          error?.error?.message ||
          'Registration failed. Please try again.';
      }
    });
  }
}