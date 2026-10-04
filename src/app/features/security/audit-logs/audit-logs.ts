import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  resourceId: string;
  ipAddress: string;
  device: string;
  result: 'SUCCESS' | 'FAILED' | 'BLOCKED';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule
  ],
  templateUrl: './audit-logs.html',
  styleUrl: './audit-logs.scss'
})
export class AuditLogsComponent {

  private readonly snackBar = inject(MatSnackBar);

  searchTerm = signal('');
  resultFilter = signal('ALL');
  severityFilter = signal('ALL');

  logs = signal<AuditLog[]>([
    {
      id: 'AUD-2026-001',
      timestamp: '04 Oct 2026 04:15 PM',
      actor: 'Pringle',
      role: 'PROCUREMENT',
      action: 'VIEW',
      resource: 'Purchase Request',
      resourceId: 'PR-1028',
      ipAddress: '192.168.1.21',
      device: 'Pringle-Laptop',
      result: 'SUCCESS',
      severity: 'LOW'
    },
    {
      id: 'AUD-2026-002',
      timestamp: '04 Oct 2026 04:10 PM',
      actor: 'Arun Kumar',
      role: 'FINANCE',
      action: 'APPROVE',
      resource: 'Payment',
      resourceId: 'PAY-1002',
      ipAddress: '192.168.1.35',
      device: 'Finance-Desktop',
      result: 'SUCCESS',
      severity: 'LOW'
    },
    {
      id: 'AUD-2026-003',
      timestamp: '04 Oct 2026 03:42 PM',
      actor: 'Unknown',
      role: 'UNKNOWN',
      action: 'ACCESS_ATTEMPT',
      resource: 'Finance API',
      resourceId: '/api/finance/payments',
      ipAddress: '185.44.72.19',
      device: 'Unknown-Device',
      result: 'BLOCKED',
      severity: 'CRITICAL'
    },
    {
      id: 'AUD-2026-004',
      timestamp: '04 Oct 2026 03:18 PM',
      actor: 'Rajesh Kumar',
      role: 'SUPPLIER',
      action: 'LOGIN',
      resource: 'Authentication',
      resourceId: '/api/auth/login',
      ipAddress: '10.10.5.23',
      device: 'Supplier-Laptop',
      result: 'FAILED',
      severity: 'HIGH'
    },
    {
      id: 'AUD-2026-005',
      timestamp: '04 Oct 2026 02:56 PM',
      actor: 'Arun Kumar',
      role: 'FINANCE',
      action: 'VIEW',
      resource: 'Restricted Report',
      resourceId: 'REPORT-204',
      ipAddress: '192.168.1.35',
      device: 'Finance-Desktop',
      result: 'BLOCKED',
      severity: 'HIGH'
    },
    {
      id: 'AUD-2026-006',
      timestamp: '04 Oct 2026 02:41 PM',
      actor: 'Pringle',
      role: 'PROCUREMENT',
      action: 'API_REQUEST',
      resource: 'Procurement API',
      resourceId: '/api/procurement/purchase-requests',
      ipAddress: '192.168.1.21',
      device: 'Pringle-Laptop',
      result: 'FAILED',
      severity: 'MEDIUM'
    },
    {
      id: 'AUD-2026-007',
      timestamp: '04 Oct 2026 01:52 PM',
      actor: 'Suresh Kumar',
      role: 'AUDITOR',
      action: 'EXPORT',
      resource: 'Audit Report',
      resourceId: 'AUDIT-REPORT-01',
      ipAddress: '192.168.1.66',
      device: 'Auditor-System',
      result: 'SUCCESS',
      severity: 'LOW'
    },
    {
      id: 'AUD-2026-008',
      timestamp: '04 Oct 2026 12:35 PM',
      actor: 'ADMIN',
      role: 'ADMIN',
      action: 'REVOKE_TRUST',
      resource: 'Device',
      resourceId: 'DEV-1005',
      ipAddress: '192.168.1.10',
      device: 'Admin-Workstation',
      result: 'SUCCESS',
      severity: 'HIGH'
    }
  ]);

  filteredLogs = computed(() => {

    const search = this.searchTerm().toLowerCase();
    const result = this.resultFilter();
    const severity = this.severityFilter();

    return this.logs().filter(log => {

      const matchesSearch =
        !search ||
        log.id.toLowerCase().includes(search) ||
        log.actor.toLowerCase().includes(search) ||
        log.action.toLowerCase().includes(search) ||
        log.resource.toLowerCase().includes(search) ||
        log.resourceId.toLowerCase().includes(search) ||
        log.ipAddress.toLowerCase().includes(search) ||
        log.device.toLowerCase().includes(search);

      const matchesResult =
        result === 'ALL' ||
        log.result === result;

      const matchesSeverity =
        severity === 'ALL' ||
        log.severity === severity;

      return matchesSearch &&
        matchesResult &&
        matchesSeverity;
    });
  });

  totalLogs = computed(() =>
    this.logs().length
  );

  successfulLogs = computed(() =>
    this.logs().filter(
      log => log.result === 'SUCCESS'
    ).length
  );

  failedLogs = computed(() =>
    this.logs().filter(
      log => log.result === 'FAILED'
    ).length
  );

  blockedLogs = computed(() =>
    this.logs().filter(
      log => log.result === 'BLOCKED'
    ).length
  );

  criticalLogs = computed(() =>
    this.logs().filter(
      log => log.severity === 'CRITICAL'
    ).length
  );

  exportLogs(): void {

    this.snackBar.open(
      `${this.filteredLogs().length} audit records prepared for export.`,
      'Close',
      { duration: 3000 }
    );
  }

  getResultClass(result: string): string {
    return result.toLowerCase();
  }

  getSeverityClass(severity: string): string {
    return severity.toLowerCase();
  }

  getActionIcon(action: string): string {

    switch (action) {

      case 'LOGIN':
        return 'login';

      case 'VIEW':
        return 'visibility';

      case 'APPROVE':
        return 'check_circle';

      case 'ACCESS_ATTEMPT':
        return 'block';

      case 'API_REQUEST':
        return 'api';

      case 'EXPORT':
        return 'download';

      case 'REVOKE_TRUST':
        return 'gpp_bad';

      default:
        return 'history';
    }
  }
}