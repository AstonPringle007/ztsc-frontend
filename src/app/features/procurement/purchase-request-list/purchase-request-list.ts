import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import {
  ProcurementService
} from '../../../core/services/procurement.service';

import {
  PurchaseRequest
} from '../../../core/models/purchase-request.model';

@Component({
  selector: 'app-purchase-request-list',
  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule
  ],

  templateUrl: './purchase-request-list.html',
  styleUrl: './purchase-request-list.scss'
})
export class PurchaseRequestListComponent implements OnInit {

  private readonly router = inject(Router);

  private readonly procurementService =
    inject(ProcurementService);

  displayedColumns = [
    'id',
    'title',
    'requester',
    'supplier',
    'amount',
    'priority',
    'status',
    'date',
    'actions'
  ];

  searchText = '';

  selectedStatus = 'ALL';

  selectedPriority = 'ALL';

  purchaseRequests: PurchaseRequest[] = [];

  loading = false;

  errorMessage = '';

  ngOnInit(): void {
    this.loadPurchaseRequests();
  }

  loadPurchaseRequests(): void {

    this.loading = true;

    this.errorMessage = '';

    this.procurementService.getAll().subscribe({

      next: (requests) => {

        this.purchaseRequests = requests;

        this.loading = false;

      },

      error: (error) => {

        console.error(
          'Failed to load purchase requests:',
          error
        );

        this.loading = false;

        this.errorMessage =
          error?.error?.message ||
          'Unable to load purchase requests.';
      }
    });
  }

  get filteredRequests(): PurchaseRequest[] {

    return this.purchaseRequests.filter((request) => {

      const search =
        this.searchText.trim().toLowerCase();

      const requester =
        request.requestedBy ?? '';

      const matchesSearch =
        !search ||
        String(request.id)
          .toLowerCase()
          .includes(search) ||
        request.title
          .toLowerCase()
          .includes(search) ||
        requester
          .toLowerCase()
          .includes(search) ||
        request.supplier
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        request.status === this.selectedStatus;

      const matchesPriority =
        this.selectedPriority === 'ALL' ||
        request.priority === this.selectedPriority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }

  get pendingCount(): number {

    return this.purchaseRequests.filter(
      request => request.status === 'PENDING'
    ).length;
  }

  get approvedCount(): number {

    return this.purchaseRequests.filter(
      request => request.status === 'APPROVED'
    ).length;
  }

  get rejectedCount(): number {

    return this.purchaseRequests.filter(
      request => request.status === 'REJECTED'
    ).length;
  }

  createRequest(): void {

    this.router.navigate([
      '/procurement/create'
    ]);
  }

  viewRequest(
    request: PurchaseRequest
  ): void {

    this.router.navigate([
      '/procurement/details',
      request.id
    ]);
  }

  editRequest(
    request: PurchaseRequest
  ): void {

    this.router.navigate([
      '/procurement/details',
      request.id
    ]);
  }

  refreshRequests(): void {
    this.loadPurchaseRequests();
  }
}