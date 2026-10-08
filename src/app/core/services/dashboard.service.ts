
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface DashboardSummary {
  totalPurchaseRequests?: number;
  approvedPurchaseRequests?: number;
  rejectedPurchaseRequests?: number;
  pendingPurchaseRequests?: number;

  totalSuppliers?: number;

  totalInventoryItems?: number;
  lowStockItems?: number;

  totalPayments?: number;
  pendingPayments?: number;
  completedPayments?: number;

  activeDevices?: number;
  totalSecurityEvents?: number;
  unresolvedSecurityEvents?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly http = inject(HttpClient);

  private readonly API_URL =
    `${environment.apiUrl}/dashboard`;

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(
      `${this.API_URL}/summary`
    );
  }
}
