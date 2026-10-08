import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-supplier-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './supplier-create.html',
  styleUrl: './supplier-create.scss'
})
export class SupplierCreateComponent {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly supplierService = inject(SupplierService);

  loading = false;
  errorMessage = '';

  supplierForm = this.fb.nonNullable.group({

    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    supplierCode: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    contactPerson: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ]
    ],

    category: [
      '',
      Validators.required
    ],

    address: [
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ],

    city: [
      '',
      Validators.required
    ],

    country: [
      'India',
      Validators.required
    ],

    status: [
      'ACTIVE',
      Validators.required
    ]
  });

  submitSupplier(): void {

    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const formValue = this.supplierForm.getRawValue();

    const supplier = {
      name: formValue.name.trim(),
      supplierCode: formValue.supplierCode.trim(),
      contactPerson: formValue.contactPerson.trim(),
      email: formValue.email.trim(),
      phone: formValue.phone.trim(),
      category: formValue.category,
      address: formValue.address.trim(),
      city: formValue.city.trim(),
      country: formValue.country.trim(),
      status: formValue.status,
      rating: 0
    };

    this.supplierService.create(supplier).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Supplier created successfully',
          'Close',
          {
            duration: 3000
          }
        );

        this.router.navigate(['/suppliers']);
      },

      error: (error) => {

        console.error('Failed to create supplier:', error);

        this.loading = false;

        this.errorMessage =
          error?.error?.message ||
          'Unable to create supplier.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/suppliers']);
  }
}