import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-purchase-request-details',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './purchase-request-details.html',
  styleUrl: './purchase-request-details.scss'
})
export class PurchaseRequestDetailsComponent {

  request = {
    id: 'PR-1028',
    title: 'Laptop Equipment',
    description:
      'Procurement of laptops for the software development and security teams.',
    category: 'IT Equipment',
    requester: 'Pringle',
    department: 'Technology',
    supplier: 'Tech Solutions Ltd',
    quantity: 10,
    amount: 245000,
    priority: 'HIGH',
    status: 'PENDING',
    requestDate: '04 Oct 2026',
    requiredDate: '20 Oct 2026',
    justification:
      'Existing development systems are outdated and additional equipment is required for the expanding engineering team.'
  };

  constructor(private readonly route: ActivatedRoute) {}

  approveRequest(): void {
    console.log('Approve request:', this.request.id);
  }

  rejectRequest(): void {
    console.log('Reject request:', this.request.id);
  }
}