import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

interface AdminUser {
  id: string;
  username: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  lastLogin: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboardComponent {

  readonly users = signal<AdminUser[]>([
    {
      id: 'USR-1001',
      username: 'Pringle',
      role: 'PROCUREMENT',
      status: 'ACTIVE',
      lastLogin: '04 Oct 2026 09:42'
    },
    {
      id: 'USR-1002',
      username: 'Arun Kumar',
      role: 'FINANCE',
      status: 'ACTIVE',
      lastLogin: '04 Oct 2026 08:55'
    },
    {
      id: 'USR-1003',
      username: 'Rajesh Kumar',
      role: 'SUPPLIER',
      status: 'ACTIVE',
      lastLogin: '03 Oct 2026 17:30'
    },
    {
      id: 'USR-1004',
      username: 'Manoj Kumar',
      role: 'WAREHOUSE',
      status: 'ACTIVE',
      lastLogin: '04 Oct 2026 07:45'
    },
    {
      id: 'USR-1005',
      username: 'Suresh Kumar',
      role: 'AUDITOR',
      status: 'INACTIVE',
      lastLogin: '01 Oct 2026 15:20'
    }
  ]);

  readonly totalUsers = computed(() => this.users().length);

  readonly activeUsers = computed(
    () => this.users().filter(user => user.status === 'ACTIVE').length
  );

  readonly inactiveUsers = computed(
    () => this.users().filter(user => user.status === 'INACTIVE').length
  );

  readonly suspendedUsers = computed(
    () => this.users().filter(user => user.status === 'SUSPENDED').length
  );

  readonly systemStats = [
    {
      title: 'Total Users',
      value: this.totalUsers,
      icon: 'people',
      description: 'Registered users'
    },
    {
      title: 'Active Users',
      value: this.activeUsers,
      icon: 'person',
      description: 'Currently active'
    },
    {
      title: 'Security Score',
      value: '94%',
      icon: 'security',
      description: 'System security'
    },
    {
      title: 'Security Events',
      value: '6',
      icon: 'warning',
      description: 'Events requiring attention'
    }
  ];

  readonly roles = [
    {
      role: 'ADMIN',
      count: 1,
      icon: 'admin_panel_settings'
    },
    {
      role: 'PROCUREMENT',
      count: 4,
      icon: 'shopping_cart'
    },
    {
      role: 'SUPPLIER',
      count: 8,
      icon: 'business'
    },
    {
      role: 'WAREHOUSE',
      count: 5,
      icon: 'inventory_2'
    },
    {
      role: 'FINANCE',
      count: 3,
      icon: 'account_balance'
    },
    {
      role: 'AUDITOR',
      count: 2,
      icon: 'fact_check'
    }
  ];

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  getRoleClass(role: string): string {
    return role.toLowerCase();
  }
}