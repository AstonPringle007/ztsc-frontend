import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  submitted = false;

  requestForm = this.fb.nonNullable.group({
    title: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    description: ['', [
      Validators.required,
      Validators.minLength(10)
    ]],

    category: ['', Validators.required],

    supplier: ['', Validators.required],

    quantity: [1, [
      Validators.required,
      Validators.min(1)
    ]],

    estimatedAmount: [0, [
      Validators.required,
      Validators.min(1)
    ]],

    priority: ['MEDIUM', Validators.required],

    requiredDate: ['', Validators.required],

    justification: ['', [
      Validators.required,
      Validators.minLength(10)
    ]]
  });

  submitRequest(): void {

    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    console.log(
      'Purchase request submitted:',
      this.requestForm.getRawValue()
    );

    this.submitted = true;

    setTimeout(() => {
      this.router.navigate(['/procurement']);
    }, 1200);
  }

}