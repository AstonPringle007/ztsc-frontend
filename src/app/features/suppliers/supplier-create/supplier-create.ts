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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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

  loading = false;

  supplierForm = this.fb.nonNullable.group({
    supplierName: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
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

    location: [
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

    taxId: [
      '',
      Validators.required
    ],

    riskLevel: [
      'LOW',
      Validators.required
    ],

    status: [
      'ACTIVE',
      Validators.required
    ],

    notes: [
      ''
    ]
  });

  submitSupplier(): void {

    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const supplier = this.supplierForm.getRawValue();

    console.log('New supplier:', supplier);

    setTimeout(() => {

      this.loading = false;

      this.snackBar.open(
        'Supplier created successfully',
        'Close',
        {
          duration: 3000
        }
      );

      this.router.navigate(['/suppliers']);

    }, 800);
  }

  cancel(): void {
    this.router.navigate(['/suppliers']);
  }
}