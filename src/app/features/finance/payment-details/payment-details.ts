import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Payment {
  id: string;
  invoiceNumber: string;
  supplier: string;
  supplierId: string;
  purchaseRequest: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  dueDate: string;
  createdDate: string;
  approvedDate: string;
  riskLevel: string;
  description: string;
}

interface PaymentTimeline {
  date: string;
  title: string;
  description: string;
  user: string;
  icon: string;
  completed: boolean;
}

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.scss'
})
export class PaymentDetailsComponent {

  private readonly snackBar = inject(MatSnackBar);

  paymentId = signal('');

  payment = signal<Payment>({
    id: 'PAY-1001',
    invoiceNumber: 'INV-2026-1042',
    supplier: 'Tech Solutions Ltd',
    supplierId: 'SUP-1001',
    purchaseRequest: 'PR-1028',
    amount: 245000,
    taxAmount: 44100,
    totalAmount: 289100,
    status: 'PENDING',
    paymentMethod: 'Bank Transfer',
    dueDate: '10 Oct 2026',
    createdDate: '04 Oct 2026',
    approvedDate: 'Pending',
    riskLevel: 'LOW',
    description:
      'Payment for laptop equipment supplied for enterprise operations and employee workstations.'
  });

  timeline = signal<PaymentTimeline[]>([
    {
      date: '04 Oct 2026',
      title: 'Payment Request Created',
      description: 'Payment request generated from approved purchase request.',
      user: 'Pringle',
      icon: 'receipt_long',
      completed: true
    },
    {
      date: '04 Oct 2026',
      title: 'Identity Verified',
      description: 'Finance user identity successfully verified.',
      user: 'Security System',
      icon: 'verified_user',
      completed: true
    },
    {
      date: '04 Oct 2026',
      title: 'Device Trust Verified',
      description: 'Payment initiated from a trusted registered device.',
      user: 'Zero Trust Engine',
      icon: 'devices',
      completed: true
    },
    {
      date: 'Pending',
      title: 'Finance Approval',
      description: 'Waiting for finance authorization.',
      user: 'Finance Team',
      icon: 'approval',
      completed: false
    },
    {
      date: 'Pending',
      title: 'Payment Processing',
      description: 'Payment will be processed after final approval.',
      user: 'Payment Gateway',
      icon: 'account_balance',
      completed: false
    }
  ]);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.route.params.subscribe(params => {
      this.paymentId.set(params['id'] || 'PAY-1001');
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
      case 'REJECTED':
        return 'cancel';
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

  approvePayment(): void {
    this.snackBar.open(
      'Payment approved successfully (mock)',
      'Close',
      { duration: 3000 }
    );

    this.payment.update(payment => ({
      ...payment,
      status: 'APPROVED',
      approvedDate: '04 Oct 2026'
    }));
  }

  rejectPayment(): void {
    this.snackBar.open(
      'Payment rejected (mock)',
      'Close',
      { duration: 3000 }
    );

    this.payment.update(payment => ({
      ...payment,
      status: 'REJECTED'
    }));
  }

  processPayment(): void {
    this.snackBar.open(
      'Payment processing initiated (mock)',
      'Close',
      { duration: 3000 }
    );

    this.payment.update(payment => ({
      ...payment,
      status: 'COMPLETED'
    }));
  }

  backToPayments(): void {
    this.router.navigate(['/finance/payments']);
  }
}