import {
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {
  ProcurementService
} from '../../../core/services/procurement.service';

@Component({
  selector: 'app-purchase-request-create',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

  templateUrl: './purchase-request-create.html',
  styleUrl: './purchase-request-create.scss'
})
export class PurchaseRequestCreateComponent {

  private readonly fb =
    inject(FormBuilder);

  private readonly router =
    inject(Router);

  private readonly procurementService =
    inject(ProcurementService);

  submitted = false;

  loading = false;

  errorMessage = '';

  requestForm = this.fb.nonNullable.group({

    title: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    productName: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ],

    category: [
      '',
      Validators.required
    ],

    supplier: [
      '',
      Validators.required
    ],

    quantity: [
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    amount: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    priority: [
      'MEDIUM',
      Validators.required
    ],

    requiredDate: [
      '',
      Validators.required
    ],

    justification: [
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ]
  });

  submitRequest(): void {

    if (this.requestForm.invalid) {

      this.requestForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    this.errorMessage = '';

    const formValue =
      this.requestForm.getRawValue();

    const request = {

      title: formValue.title,

      productName:
        formValue.productName,

      category:
        formValue.category,

      supplier:
        formValue.supplier,

      quantity:
        Number(formValue.quantity),

      amount:
        Number(formValue.amount),

      description:
        formValue.description,

      priority:
        formValue.priority,

      requiredDate:
        this.formatDate(formValue.requiredDate),

      justification:
        formValue.justification
    };

    this.procurementService
      .create(request)
      .subscribe({

        next: (response) => {

          console.log(
            'Purchase request created:',
            response
          );

          this.loading = false;

          this.submitted = true;

          setTimeout(() => {

            this.router.navigate([
              '/procurement'
            ]);

          }, 1200);
        },

        error: (error) => {

          console.error(
            'Failed to create purchase request:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to create purchase request.';
        }
      });
  }

  private formatDate(
    value: string
  ): string {

    if (!value) {
      return '';
    }

    const date = new Date(value);

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        date.getDate()
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}