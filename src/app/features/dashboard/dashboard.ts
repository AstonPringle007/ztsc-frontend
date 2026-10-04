import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

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
export class DashboardComponent {

  securityScore = 94;

  statistics = {
    purchaseRequests: 128,
    pendingApprovals: 17,
    activeDevices: 24,
    securityEvents: 6
  };

  recentActivities = [
    {
      icon: 'login',
      title: 'Successful login',
      description: 'User pringle2 logged into the system',
      time: '5 minutes ago',
      type: 'success'
    },
    {
      icon: 'devices',
      title: 'New device detected',
      description: 'A new device was detected for a supplier account',
      time: '18 minutes ago',
      type: 'warning'
    },
    {
      icon: 'shopping_cart',
      title: 'Purchase request created',
      description: 'Purchase request PR-1028 was created',
      time: '32 minutes ago',
      type: 'info'
    },
    {
      icon: 'verified_user',
      title: 'Device trusted',
      description: 'Device DEV-2045 was marked as trusted',
      time: '1 hour ago',
      type: 'success'
    },
    {
      icon: 'warning',
      title: 'Anomaly detected',
      description: 'Unusual request pattern detected',
      time: '2 hours ago',
      type: 'danger'
    }
  ];

  securityEvents = [
    {
      name: 'Suspicious login attempt',
      severity: 'HIGH',
      count: 2
    },
    {
      name: 'Unknown device',
      severity: 'MEDIUM',
      count: 3
    },
    {
      name: 'Unusual API activity',
      severity: 'LOW',
      count: 1
    }
  ];

}