import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
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
  selector: 'app-payment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule
  ],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.scss'
})
export class PaymentListComponent {

  private readonly router = inject(Router);

  searchTerm = signal('');
  selectedStatus = signal('ALL');
  selectedRisk = signal('ALL');

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
    },
    {
      id: 'PAY-1006',
      invoiceNumber: 'INV-2026-0987',
      supplier: 'Cloud Systems India',
      purchaseRequest: 'PR-1023',
      amount: 310000,
      status: 'APPROVED',
      paymentMethod: 'Bank Transfer',
      dueDate: '07 Oct 2026',
      createdDate: '29 Sep 2026',
      riskLevel: 'LOW'
    },
    {
      id: 'PAY-1007',
      invoiceNumber: 'INV-2026-0975',
      supplier: 'Global Infrastructure',
      purchaseRequest: 'PR-1020',
      amount: 95000,
      status: 'PENDING',
      paymentMethod: 'Bank Transfer',
      dueDate: '15 Oct 2026',
      createdDate: '27 Sep 2026',
      riskLevel: 'MEDIUM'
    }
  ]);

  filteredPayments = computed(() => {

    const search = this.searchTerm().toLowerCase();
    const status = this.selectedStatus();
    const risk = this.selectedRisk();

    return this.payments().filter(payment => {

      const matchesSearch =
        !search ||
        payment.id.toLowerCase().includes(search) ||
        payment.invoiceNumber.toLowerCase().includes(search) ||
        payment.supplier.toLowerCase().includes(search) ||
        payment.purchaseRequest.toLowerCase().includes(search);

      const matchesStatus =
        status === 'ALL' ||
        payment.status === status;

      const matchesRisk =
        risk === 'ALL' ||
        payment.riskLevel === risk;

      return matchesSearch && matchesStatus && matchesRisk;
    });
  });

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
    this.payments()
      .reduce((sum, payment) => sum + payment.amount, 0)
  );

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedStatus.set('ALL');
    this.selectedRisk.set('ALL');
  }

  viewPayment(payment: Payment): void {
    this.router.navigate(['/finance/payments', payment.id]);
  }

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