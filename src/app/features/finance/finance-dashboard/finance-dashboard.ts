import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Payment {
  id: string;
  invoiceNumber: string;
  supplier: string;
  purchaseRequest: string;
  amount: number;
  status: string;
  paymentMethod: string;
  dueDate: string;
  createdDate: string;
  riskLevel: string;
}

@Component({
  selector: 'app-finance-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './finance-dashboard.html',
  styleUrl: './finance-dashboard.scss'
})
export class FinanceDashboardComponent {

  payments = signal<Payment[]>([
    {
      id: 'PAY-1001',
      invoiceNumber: 'INV-2026-1042',
      supplier: 'Tech Solutions Ltd',
      purchaseRequest: 'PR-1028',
      amount: 245000,
      status: 'PENDING',
      paymentMethod: 'Bank Transfer',
      dueDate: '10 Oct 2026',
      createdDate: '04 Oct 2026',
      riskLevel: 'LOW'
    },
    {
      id: 'PAY-1002',
      invoiceNumber: 'INV-2026-1035',
      supplier: 'SecureTech Systems',
      purchaseRequest: 'PR-1026',
      amount: 180000,
      status: 'APPROVED',
      paymentMethod: 'Bank Transfer',
      dueDate: '08 Oct 2026',
      createdDate: '02 Oct 2026',
      riskLevel: 'LOW'
    },
    {
      id: 'PAY-1003',
      invoiceNumber: 'INV-2026-1021',
      supplier: 'Industrial Systems',
      purchaseRequest: 'PR-1027',
      amount: 85000,
      status: 'COMPLETED',
      paymentMethod: 'Bank Transfer',
      dueDate: '05 Oct 2026',
      createdDate: '28 Sep 2026',
      riskLevel: 'LOW'
    },
    {
      id: 'PAY-1004',
      invoiceNumber: 'INV-2026-1008',
      supplier: 'Office World',
      purchaseRequest: 'PR-1025',
      amount: 32000,
      status: 'COMPLETED',
      paymentMethod: 'UPI',
      dueDate: '03 Oct 2026',
      createdDate: '25 Sep 2026',
      riskLevel: 'LOW'
    },
    {
      id: 'PAY-1005',
      invoiceNumber: 'INV-2026-0998',
      supplier: 'Warehouse Pro',
      purchaseRequest: 'PR-1024',
      amount: 125000,
      status: 'REVIEW',
      paymentMethod: 'Bank Transfer',
      dueDate: '12 Oct 2026',
      createdDate: '30 Sep 2026',
      riskLevel: 'MEDIUM'
    }
  ]);

  totalPayments = computed(() => this.payments().length);

  pendingPayments = computed(() =>
    this.payments().filter(p => p.status === 'PENDING').length
  );

  approvedPayments = computed(() =>
    this.payments().filter(p => p.status === 'APPROVED').length
  );

  completedPayments = computed(() =>
    this.payments().filter(p => p.status === 'COMPLETED').length
  );

  reviewPayments = computed(() =>
    this.payments().filter(p => p.status === 'REVIEW').length
  );

  totalAmount = computed(() =>
    this.payments().reduce((sum, payment) => sum + payment.amount, 0)
  );

  pendingAmount = computed(() =>
    this.payments()
      .filter(p => p.status === 'PENDING' || p.status === 'APPROVED')
      .reduce((sum, payment) => sum + payment.amount, 0)
  );

  completedAmount = computed(() =>
    this.payments()
      .filter(p => p.status === 'COMPLETED')
      .reduce((sum, payment) => sum + payment.amount, 0)
  );

  recentPayments = computed(() =>
    this.payments().slice(0, 5)
  );

  getStatusIcon(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'check_circle';
      case 'APPROVED':
        return 'verified';
      case 'PENDING':
        return 'schedule';
      case 'REVIEW':
        return 'warning';
      default:
        return 'payment';
    }
  }

  getRiskIcon(risk: string): string {
    switch (risk) {
      case 'LOW':
        return 'shield';
      case 'MEDIUM':
        return 'warning';
      case 'HIGH':
        return 'dangerous';
      default:
        return 'shield';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
}