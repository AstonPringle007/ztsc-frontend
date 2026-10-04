import { Component, inject } from '@angular/core';
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

interface PurchaseRequest {
  id: string;
  title: string;
  requester: string;
  supplier: string;
  amount: number;
  status: string;
  priority: string;
  date: string;
}

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
    FormsModule,
  ],
  templateUrl: './purchase-request-list.html',
  styleUrl: './purchase-request-list.scss',
})
export class PurchaseRequestListComponent {
  private readonly router = inject(Router);
  displayedColumns = [
    'id',
    'title',
    'requester',
    'supplier',
    'amount',
    'priority',
    'status',
    'date',
    'actions',
  ];

  searchText = '';
  selectedStatus = 'ALL';
  selectedPriority = 'ALL';

  purchaseRequests: PurchaseRequest[] = [
    {
      id: 'PR-1028',
      title: 'Laptop Equipment',
      requester: 'Pringle',
      supplier: 'Tech Solutions Ltd',
      amount: 245000,
      status: 'PENDING',
      priority: 'HIGH',
      date: '04 Oct 2026',
    },
    {
      id: 'PR-1027',
      title: 'Warehouse Barcode Scanner',
      requester: 'Arun',
      supplier: 'Industrial Systems',
      amount: 85000,
      status: 'APPROVED',
      priority: 'MEDIUM',
      date: '03 Oct 2026',
    },
    {
      id: 'PR-1026',
      title: 'Network Security Devices',
      requester: 'Pringle',
      supplier: 'SecureTech',
      amount: 180000,
      status: 'PENDING',
      priority: 'HIGH',
      date: '02 Oct 2026',
    },
    {
      id: 'PR-1025',
      title: 'Office Supplies',
      requester: 'Kumar',
      supplier: 'Office World',
      amount: 32000,
      status: 'COMPLETED',
      priority: 'LOW',
      date: '01 Oct 2026',
    },
    {
      id: 'PR-1024',
      title: 'Storage Equipment',
      requester: 'Suresh',
      supplier: 'Warehouse Pro',
      amount: 125000,
      status: 'REJECTED',
      priority: 'MEDIUM',
      date: '30 Sep 2026',
    },
    {
      id: 'PR-1023',
      title: 'Cloud Infrastructure',
      requester: 'Pringle',
      supplier: 'Cloud Systems',
      amount: 310000,
      status: 'APPROVED',
      priority: 'HIGH',
      date: '29 Sep 2026',
    },
  ];

  get filteredRequests(): PurchaseRequest[] {
    return this.purchaseRequests.filter((request) => {
      const search = this.searchText.toLowerCase();

      const matchesSearch =
        !search ||
        request.id.toLowerCase().includes(search) ||
        request.title.toLowerCase().includes(search) ||
        request.requester.toLowerCase().includes(search) ||
        request.supplier.toLowerCase().includes(search);

      const matchesStatus = this.selectedStatus === 'ALL' || request.status === this.selectedStatus;

      const matchesPriority =
        this.selectedPriority === 'ALL' || request.priority === this.selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  createRequest(): void {
    console.log('Create purchase request');
  }

  viewRequest(request: PurchaseRequest): void {
    this.router.navigate(['/procurement/details', request.id]);
  }

  editRequest(request: PurchaseRequest): void {
    console.log('Edit request:', request);
  }
}
