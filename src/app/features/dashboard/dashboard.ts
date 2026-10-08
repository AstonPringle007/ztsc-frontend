import { Component, OnInit, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

import {
  DashboardService,
  DashboardSummary
} from '../../core/services/dashboard.service';

interface RecentActivity {
  icon: string;
  title: string;
  description: string;
  time: string;
  type: string;
}

interface SecurityEvent {
  name: string;
  severity: string;
  count: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  private readonly dashboardService = inject(DashboardService);

  loading = false;
  errorMessage = '';

  securityScore = 0;
  riskLevel = 'LOW';

  riskDescription =
    'No critical security threats detected.';

  statistics = {
    purchaseRequests: 0,
    pendingApprovals: 0,
    activeDevices: 0,
    securityEvents: 0
  };

  recentActivities: RecentActivity[] = [];

  securityEvents: SecurityEvent[] = [];

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.loading = true;
    this.errorMessage = '';

    this.dashboardService.getSummary().subscribe({

      next: (summary: DashboardSummary) => {

        this.updateDashboard(summary);

        this.loading = false;
      },

      error: error => {

        console.error(
          'Failed to load dashboard:',
          error
        );

        this.loading = false;

        this.errorMessage =
          error?.error?.message ||
          'Unable to load dashboard data.';
      }

    });
  }

  refreshDashboard(): void {
    this.loadDashboard();
  }

  private updateDashboard(
    summary: DashboardSummary
  ): void {

    const totalPurchaseRequests =
      summary.totalPurchaseRequests ?? 0;

    const pendingPurchaseRequests =
      summary.pendingPurchaseRequests ?? 0;

    const activeDevices =
      summary.activeDevices ?? 0;

    const totalSecurityEvents =
      summary.totalSecurityEvents ?? 0;

    const unresolvedSecurityEvents =
      summary.unresolvedSecurityEvents ?? 0;

    this.statistics = {
      purchaseRequests:
        totalPurchaseRequests,

      pendingApprovals:
        pendingPurchaseRequests,

      activeDevices:
        activeDevices,

      securityEvents:
        totalSecurityEvents
    };

    /*
     * Dashboard security score.
     *
     * This is a UI health score based on
     * unresolved security events.
     */

    const riskPenalty =
      Math.min(
        unresolvedSecurityEvents * 5,
        100
      );

    this.securityScore =
      Math.max(
        0,
        100 - riskPenalty
      );

    /*
     * Risk level.
     */

    if (unresolvedSecurityEvents >= 10) {

      this.riskLevel = 'CRITICAL';

      this.riskDescription =
        'Multiple unresolved security events require immediate attention.';

    } else if (unresolvedSecurityEvents >= 5) {

      this.riskLevel = 'HIGH';

      this.riskDescription =
        'Several security events require investigation.';

    } else if (unresolvedSecurityEvents > 0) {

      this.riskLevel = 'MEDIUM';

      this.riskDescription =
        'Some security events require monitoring.';

    } else {

      this.riskLevel = 'LOW';

      this.riskDescription =
        'No critical security threats detected.';
    }

    /*
     * Security events.
     */

    this.securityEvents = [

      {
        name: 'Unresolved security events',
        severity:
          unresolvedSecurityEvents > 0
            ? 'HIGH'
            : 'LOW',
        count:
          unresolvedSecurityEvents
      },

      {
        name: 'Total security events',
        severity:
          totalSecurityEvents > 0
            ? 'MEDIUM'
            : 'LOW',
        count:
          totalSecurityEvents
      },

      {
        name: 'Active devices',
        severity: 'LOW',
        count:
          activeDevices
      }

    ];

    /*
     * Recent activity.
     */

    this.recentActivities = [

      {
        icon: 'shopping_cart',
        title: 'Purchase requests',
        description:
          `${totalPurchaseRequests} purchase request(s) in the system`,
        time: 'Current',
        type: 'info'
      },

      {
        icon: 'pending_actions',
        title: 'Pending approvals',
        description:
          `${pendingPurchaseRequests} request(s) require attention`,
        time: 'Current',
        type: 'warning'
      },

      {
        icon: 'devices',
        title: 'Active devices',
        description:
          `${activeDevices} active device(s) detected`,
        time: 'Current',
        type: 'success'
      },

      {
        icon: 'security',
        title: 'Security monitoring',
        description:
          `${totalSecurityEvents} security event(s) recorded`,
        time: 'Current',
        type: 'info'
      },

      {
        icon: 'warning',
        title: 'Unresolved security events',
        description:
          `${unresolvedSecurityEvents} event(s) require investigation`,
        time: 'Current',
        type:
          unresolvedSecurityEvents > 0
            ? 'danger'
            : 'success'
      }

    ];
  }
}