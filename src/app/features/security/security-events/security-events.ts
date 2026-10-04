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

interface SecurityEvent {
  eventId: string;
  type: string;
  description: string;
  user: string;
  device: string;
  ipAddress: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  timestamp: string;
}

@Component({
  selector: 'app-security-events',
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
  templateUrl: './security-events.html',
  styleUrl: './security-events.scss'
})
export class SecurityEventsComponent {

  private readonly snackBar = inject(MatSnackBar);

  searchTerm = signal('');
  severityFilter = signal('ALL');
  statusFilter = signal('ALL');
  typeFilter = signal('ALL');

  events = signal<SecurityEvent[]>([
    {
      eventId: 'SEC-2026-001',
      type: 'UNTRUSTED_DEVICE',
      description: 'Access attempt from an untrusted device',
      user: 'Unknown',
      device: 'Unknown-Device',
      ipAddress: '185.44.72.19',
      severity: 'CRITICAL',
      status: 'OPEN',
      timestamp: '04 Oct 2026 03:42 PM'
    },
    {
      eventId: 'SEC-2026-002',
      type: 'AUTHENTICATION_FAILURE',
      description: 'Multiple failed authentication attempts',
      user: 'Rajesh Kumar',
      device: 'Supplier-Laptop',
      ipAddress: '10.10.5.23',
      severity: 'HIGH',
      status: 'INVESTIGATING',
      timestamp: '04 Oct 2026 03:18 PM'
    },
    {
      eventId: 'SEC-2026-003',
      type: 'UNAUTHORIZED_ACCESS',
      description: 'User attempted to access restricted finance resource',
      user: 'Arun Kumar',
      device: 'Finance-Desktop',
      ipAddress: '192.168.1.35',
      severity: 'HIGH',
      status: 'OPEN',
      timestamp: '04 Oct 2026 02:56 PM'
    },
    {
      eventId: 'SEC-2026-004',
      type: 'TOKEN_FAILURE',
      description: 'JWT token rejected with HTTP 401',
      user: 'Pringle',
      device: 'Pringle-Laptop',
      ipAddress: '192.168.1.21',
      severity: 'MEDIUM',
      status: 'RESOLVED',
      timestamp: '04 Oct 2026 02:41 PM'
    },
    {
      eventId: 'SEC-2026-005',
      type: 'ANOMALOUS_ACTIVITY',
      description: 'Unusual request frequency detected',
      user: 'Suresh Kumar',
      device: 'Auditor-System',
      ipAddress: '192.168.1.66',
      severity: 'MEDIUM',
      status: 'INVESTIGATING',
      timestamp: '04 Oct 2026 01:52 PM'
    },
    {
      eventId: 'SEC-2026-006',
      type: 'DEVICE_TRUST_REVOKED',
      description: 'Device trust was revoked by security policy',
      user: 'Rajesh Kumar',
      device: 'Supplier-Laptop',
      ipAddress: '10.10.5.23',
      severity: 'HIGH',
      status: 'RESOLVED',
      timestamp: '04 Oct 2026 12:35 PM'
    },
    {
      eventId: 'SEC-2026-007',
      type: 'LOGIN_SUCCESS',
      description: 'Successful authentication from trusted device',
      user: 'Pringle',
      device: 'Pringle-Laptop',
      ipAddress: '192.168.1.21',
      severity: 'LOW',
      status: 'RESOLVED',
      timestamp: '04 Oct 2026 09:05 AM'
    },
    {
      eventId: 'SEC-2026-008',
      type: 'IP_ANOMALY',
      description: 'Login detected from an unusual IP address',
      user: 'Rajesh Kumar',
      device: 'Supplier-Laptop',
      ipAddress: '172.20.44.18',
      severity: 'CRITICAL',
      status: 'OPEN',
      timestamp: '03 Oct 2026 11:48 PM'
    }
  ]);

  filteredEvents = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const severity = this.severityFilter();
    const status = this.statusFilter();
    const type = this.typeFilter();

    return this.events().filter(event => {

      const matchesSearch =
        !search ||
        event.eventId.toLowerCase().includes(search) ||
        event.type.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search) ||
        event.user.toLowerCase().includes(search) ||
        event.device.toLowerCase().includes(search) ||
        event.ipAddress.toLowerCase().includes(search);

      const matchesSeverity =
        severity === 'ALL' || event.severity === severity;

      const matchesStatus =
        status === 'ALL' || event.status === status;

      const matchesType =
        type === 'ALL' || event.type === type;

      return matchesSearch &&
        matchesSeverity &&
        matchesStatus &&
        matchesType;
    });
  });

  totalEvents = computed(() => this.events().length);

  openEvents = computed(() =>
    this.events().filter(event => event.status === 'OPEN').length
  );

  investigatingEvents = computed(() =>
    this.events().filter(event => event.status === 'INVESTIGATING').length
  );

  criticalEvents = computed(() =>
    this.events().filter(
      event => event.severity === 'CRITICAL'
    ).length
  );

  highSeverityEvents = computed(() =>
    this.events().filter(
      event => event.severity === 'HIGH'
    ).length
  );

  resolveEvent(event: SecurityEvent): void {
    this.events.update(events =>
      events.map(item =>
        item.eventId === event.eventId
          ? { ...item, status: 'RESOLVED' }
          : item
      )
    );

    this.snackBar.open(
      `${event.eventId} marked as resolved.`,
      'Close',
      { duration: 3000 }
    );
  }

  investigateEvent(event: SecurityEvent): void {
    this.events.update(events =>
      events.map(item =>
        item.eventId === event.eventId
          ? { ...item, status: 'INVESTIGATING' }
          : item
      )
    );

    this.snackBar.open(
      `${event.eventId} is now under investigation.`,
      'Close',
      { duration: 3000 }
    );
  }

  getSeverityClass(severity: string): string {
    return severity.toLowerCase();
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  getEventIcon(type: string): string {
    switch (type) {
      case 'UNTRUSTED_DEVICE':
        return 'devices_other';

      case 'AUTHENTICATION_FAILURE':
        return 'login';

      case 'UNAUTHORIZED_ACCESS':
        return 'block';

      case 'TOKEN_FAILURE':
        return 'vpn_key';

      case 'ANOMALOUS_ACTIVITY':
        return 'warning';

      case 'DEVICE_TRUST_REVOKED':
        return 'gpp_bad';

      case 'LOGIN_SUCCESS':
        return 'verified_user';

      case 'IP_ANOMALY':
        return 'public';

      default:
        return 'security';
    }
  }
}