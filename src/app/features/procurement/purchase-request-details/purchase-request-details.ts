import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import {
  ProcurementService
} from '../../../core/services/procurement.service';

import {
  PurchaseRequest
} from '../../../core/models/purchase-request.model';

@Component({
  selector: 'app-purchase-request-details',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],

  templateUrl: './purchase-request-details.html',

  styleUrl: './purchase-request-details.scss'
})
export class PurchaseRequestDetailsComponent
  implements OnInit {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly procurementService =
    inject(ProcurementService);

  request: PurchaseRequest | null = null;

  loading = false;

  actionLoading = false;

  errorMessage = '';

  actionMessage = '';

  ngOnInit(): void {

    this.loadRequest();

  }

  loadRequest(): void {

    const idParam =
      this.route.snapshot.paramMap.get('id');

    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {

      this.errorMessage =
        'Invalid purchase request ID.';

      return;
    }

    this.loading = true;

    this.errorMessage = '';

    this.procurementService
      .getById(id)
      .subscribe({

        next: (request) => {

          this.request = request;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Failed to load purchase request:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to load purchase request.';
        }
      });
  }

  approveRequest(): void {

    if (!this.request) {
      return;
    }

    if (this.request.status !== 'PENDING') {
      return;
    }

    const confirmed =
      window.confirm(
        'Are you sure you want to approve this purchase request?'
      );

    if (!confirmed) {
      return;
    }

    this.actionLoading = true;

    this.errorMessage = '';

    this.actionMessage = '';

    this.procurementService
      .approve(this.request.id)
      .subscribe({

        next: (updatedRequest) => {

          this.request = updatedRequest;

          this.actionLoading = false;

          this.actionMessage =
            'Purchase request approved successfully.';
        },

        error: (error) => {

          console.error(
            'Failed to approve request:',
            error
          );

          this.actionLoading = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to approve purchase request.';
        }
      });
  }

  rejectRequest(): void {

    if (!this.request) {
      return;
    }

    if (this.request.status !== 'PENDING') {
      return;
    }

    const confirmed =
      window.confirm(
        'Are you sure you want to reject this purchase request?'
      );

    if (!confirmed) {
      return;
    }

    this.actionLoading = true;

    this.errorMessage = '';

    this.actionMessage = '';

    this.procurementService
      .reject(this.request.id)
      .subscribe({

        next: (updatedRequest) => {

          this.request = updatedRequest;

          this.actionLoading = false;

          this.actionMessage =
            'Purchase request rejected successfully.';
        },

        error: (error) => {

          console.error(
            'Failed to reject request:',
            error
          );

          this.actionLoading = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to reject purchase request.';
        }
      });
  }

  get statusClass(): string {

    if (!this.request) {
      return '';
    }

    return this.request.status
      .toLowerCase();
  }

  get priorityClass(): string {

    if (!this.request) {
      return '';
    }

    return this.request.priority
      .toLowerCase();
  }

  get canApproveOrReject(): boolean {

    return !!this.request &&
      this.request.status === 'PENDING' &&
      !this.actionLoading;
  }

  formatDate(
    value?: string
  ): string {

    if (!value) {
      return '—';
    }

    return new Date(value)
      .toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      );
  }

  formatDateTime(
    value?: string
  ): string {

    if (!value) {
      return '—';
    }

    return new Date(value)
      .toLocaleString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
      );
  }

  backToRequests(): void {

    this.router.navigate([
      '/procurement'
    ]);
  }
}