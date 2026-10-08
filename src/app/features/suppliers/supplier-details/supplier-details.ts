import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { SupplierService } from '../../../core/services/supplier.service';

import {
  Supplier,
  CreateSupplier
} from '../../../core/models/supplier.model';

@Component({
  selector: 'app-supplier-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './supplier-details.html',
  styleUrl: './supplier-details.scss'
})
export class SupplierDetailsComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly supplierService = inject(SupplierService);
  private readonly snackBar = inject(MatSnackBar);

  supplier = signal<Supplier | null>(null);

  loading = false;
  saving = false;
  deleting = false;
  editing = false;

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
    ],

    rating: [
      0,
      [
        Validators.required,
        Validators.min(0),
        Validators.max(5)
      ]
    ]
  });

  ngOnInit(): void {
    this.loadSupplier();
  }

  loadSupplier(): void {

    const idParam =
      this.route.snapshot.paramMap.get('id');

    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.errorMessage = 'Invalid supplier ID.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.supplierService.getById(id).subscribe({

      next: (supplier) => {

        this.supplier.set(supplier);

        this.supplierForm.patchValue({
          name: supplier.name,
          supplierCode: supplier.supplierCode,
          contactPerson: supplier.contactPerson,
          email: supplier.email,
          phone: supplier.phone,
          category: supplier.category,
          address: supplier.address,
          city: supplier.city,
          country: supplier.country,
          status: supplier.status,
          rating: supplier.rating ?? 0
        });

        this.loading = false;
      },

      error: (error) => {

        console.error(
          'Failed to load supplier:',
          error
        );

        this.loading = false;

        this.errorMessage =
          error?.error?.message ||
          'Unable to load supplier.';
      }
    });
  }

  startEdit(): void {
    this.errorMessage = '';
    this.editing = true;
  }

  cancelEdit(): void {

    const currentSupplier =
      this.supplier();

    if (!currentSupplier) {
      return;
    }

    this.supplierForm.patchValue({
      name: currentSupplier.name,
      supplierCode: currentSupplier.supplierCode,
      contactPerson: currentSupplier.contactPerson,
      email: currentSupplier.email,
      phone: currentSupplier.phone,
      category: currentSupplier.category,
      address: currentSupplier.address,
      city: currentSupplier.city,
      country: currentSupplier.country,
      status: currentSupplier.status,
      rating: currentSupplier.rating ?? 0
    });

    this.editing = false;
    this.errorMessage = '';
  }

  updateSupplier(): void {

    const currentSupplier =
      this.supplier();

    if (!currentSupplier) {
      return;
    }

    if (this.supplierForm.invalid) {

      this.supplierForm.markAllAsTouched();

      return;
    }

    this.saving = true;
    this.errorMessage = '';

    const formValue =
      this.supplierForm.getRawValue();

    const supplier: CreateSupplier = {
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
      rating: formValue.rating
    };

    this.supplierService
      .update(currentSupplier.id, supplier)
      .subscribe({

        next: (updatedSupplier) => {

          this.supplier.set(updatedSupplier);

          this.saving = false;
          this.editing = false;

          this.snackBar.open(
            'Supplier updated successfully',
            'Close',
            {
              duration: 3000
            }
          );
        },

        error: (error) => {

          console.error(
            'Failed to update supplier:',
            error
          );

          this.saving = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to update supplier.';
        }
      });
  }

  deleteSupplier(): void {

    const currentSupplier =
      this.supplier();

    if (!currentSupplier) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${currentSupplier.name}?`
      );

    if (!confirmed) {
      return;
    }

    this.deleting = true;
    this.errorMessage = '';

    this.supplierService
      .delete(currentSupplier.id)
      .subscribe({

        next: () => {

          this.deleting = false;

          this.snackBar.open(
            'Supplier deleted successfully',
            'Close',
            {
              duration: 3000
            }
          );

          this.router.navigate([
            '/suppliers'
          ]);
        },

        error: (error) => {

          console.error(
            'Failed to delete supplier:',
            error
          );

          this.deleting = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to delete supplier.';
        }
      });
  }

  contactSupplier(): void {

    const currentSupplier =
      this.supplier();

    if (!currentSupplier?.email) {
      return;
    }

    window.location.href =
      `mailto:${currentSupplier.email}`;
  }

  formatRating(
    rating?: number
  ): string {

    return (rating ?? 0).toFixed(1);
  }
}