import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

interface Device {
  deviceId: string;
  deviceName: string;
  user: string;
  role: string;
  ipAddress: string;
  userAgent: string;
  trusted: boolean;
  active: boolean;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  lastSeen: string;
}

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule
  ],
  templateUrl: './devices.html',
  styleUrl: './devices.scss'
})
export class DevicesComponent {

  private readonly snackBar = inject(MatSnackBar);

  searchTerm = signal('');
  trustFilter = signal('ALL');
  statusFilter = signal('ALL');
  riskFilter = signal('ALL');

  devices = signal<Device[]>([
    {
      deviceId: 'DEV-1001',
      deviceName: 'Pringle-Laptop',
      user: 'Pringle',
      role: 'PROCUREMENT',
      ipAddress: '192.168.1.21',
      userAgent: 'Chrome / Windows 11',
      trusted: true,
      active: true,
      risk: 'LOW',
      lastSeen: '04 Oct 2026 04:15 PM'
    },
    {
      deviceId: 'DEV-1002',
      deviceName: 'Finance-Desktop',
      user: 'Arun Kumar',
      role: 'FINANCE',
      ipAddress: '192.168.1.35',
      userAgent: 'Edge / Windows 11',
      trusted: true,
      active: true,
      risk: 'LOW',
      lastSeen: '04 Oct 2026 04:10 PM'
    },
    {
      deviceId: 'DEV-1003',
      deviceName: 'Warehouse-Scanner',
      user: 'Manoj Kumar',
      role: 'WAREHOUSE',
      ipAddress: '192.168.1.48',
      userAgent: 'Android Scanner',
      trusted: true,
      active: true,
      risk: 'MEDIUM',
      lastSeen: '04 Oct 2026 03:58 PM'
    },
    {
      deviceId: 'DEV-1004',
      deviceName: 'Unknown-Device',
      user: 'Unknown',
      role: 'UNKNOWN',
      ipAddress: '185.44.72.19',
      userAgent: 'Unknown Browser',
      trusted: false,
      active: true,
      risk: 'CRITICAL',
      lastSeen: '04 Oct 2026 03:42 PM'
    },
    {
      deviceId: 'DEV-1005',
      deviceName: 'Supplier-Laptop',
      user: 'Rajesh Kumar',
      role: 'SUPPLIER',
      ipAddress: '10.10.5.23',
      userAgent: 'Chrome / Windows 10',
      trusted: false,
      active: true,
      risk: 'HIGH',
      lastSeen: '04 Oct 2026 02:35 PM'
    },
    {
      deviceId: 'DEV-1006',
      deviceName: 'Auditor-System',
      user: 'Suresh Kumar',
      role: 'AUDITOR',
      ipAddress: '192.168.1.66',
      userAgent: 'Firefox / Windows 11',
      trusted: true,
      active: false,
      risk: 'LOW',
      lastSeen: '03 Oct 2026 06:20 PM'
    }
  ]);

  filteredDevices = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const trust = this.trustFilter();
    const status = this.statusFilter();
    const risk = this.riskFilter();

    return this.devices().filter(device => {

      const matchesSearch =
        !search ||
        device.deviceId.toLowerCase().includes(search) ||
        device.deviceName.toLowerCase().includes(search) ||
        device.user.toLowerCase().includes(search) ||
        device.ipAddress.toLowerCase().includes(search);

      const matchesTrust =
        trust === 'ALL' ||
        (trust === 'TRUSTED' && device.trusted) ||
        (trust === 'UNTRUSTED' && !device.trusted);

      const matchesStatus =
        status === 'ALL' ||
        (status === 'ACTIVE' && device.active) ||
        (status === 'INACTIVE' && !device.active);

      const matchesRisk =
        risk === 'ALL' || device.risk === risk;

      return matchesSearch &&
        matchesTrust &&
        matchesStatus &&
        matchesRisk;
    });
  });

  totalDevices = computed(() => this.devices().length);

  trustedDevices = computed(() =>
    this.devices().filter(device => device.trusted).length
  );

  untrustedDevices = computed(() =>
    this.devices().filter(device => !device.trusted).length
  );

  activeDevices = computed(() =>
    this.devices().filter(device => device.active).length
  );

  highRiskDevices = computed(() =>
    this.devices().filter(
      device => device.risk === 'HIGH' || device.risk === 'CRITICAL'
    ).length
  );

  trustDevice(device: Device): void {
    this.devices.update(devices =>
      devices.map(item =>
        item.deviceId === device.deviceId
          ? { ...item, trusted: true, risk: 'LOW' }
          : item
      )
    );

    this.snackBar.open(
      `${device.deviceName} is now trusted.`,
      'Close',
      { duration: 3000 }
    );
  }

  revokeTrust(device: Device): void {
    this.devices.update(devices =>
      devices.map(item =>
        item.deviceId === device.deviceId
          ? { ...item, trusted: false, risk: 'HIGH' }
          : item
      )
    );

    this.snackBar.open(
      `Trust revoked for ${device.deviceName}.`,
      'Close',
      { duration: 3000 }
    );
  }

  disableDevice(device: Device): void {
    this.devices.update(devices =>
      devices.map(item =>
        item.deviceId === device.deviceId
          ? { ...item, active: false }
          : item
      )
    );

    this.snackBar.open(
      `${device.deviceName} has been disabled.`,
      'Close',
      { duration: 3000 }
    );
  }

  getRiskClass(risk: string): string {
    return risk.toLowerCase();
  }
}