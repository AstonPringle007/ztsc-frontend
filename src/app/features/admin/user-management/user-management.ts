import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface SystemUser {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'PROCUREMENT' | 'SUPPLIER' | 'WAREHOUSE' | 'FINANCE' | 'AUDITOR';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  lastLogin: string;
  deviceCount: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss'
})
export class UserManagementComponent {

  private readonly snackBar = inject(MatSnackBar);

  readonly users = signal<SystemUser[]>([
    {
      id: 'USR-1001',
      username: 'Pringle',
      email: 'pringle@company.com',
      role: 'PROCUREMENT',
      status: 'ACTIVE',
      lastLogin: '04 Oct 2026 09:42',
      deviceCount: 1,
      risk: 'LOW'
    },
    {
      id: 'USR-1002',
      username: 'Arun Kumar',
      email: 'arun.kumar@company.com',
      role: 'FINANCE',
      status: 'ACTIVE',
      lastLogin: '04 Oct 2026 08:55',
      deviceCount: 1,
      risk: 'LOW'
    },
    {
      id: 'USR-1003',
      username: 'Rajesh Kumar',
      email: 'rajesh@techsolutions.com',
      role: 'SUPPLIER',
      status: 'ACTIVE',
      lastLogin: '03 Oct 2026 17:30',
      deviceCount: 2,
      risk: 'HIGH'
    },
    {
      id: 'USR-1004',
      username: 'Manoj Kumar',
      email: 'manoj@warehouse.com',
      role: 'WAREHOUSE',
      status: 'ACTIVE',
      lastLogin: '04 Oct 2026 07:45',
      deviceCount: 1,
      risk: 'MEDIUM'
    },
    {
      id: 'USR-1005',
      username: 'Suresh Kumar',
      email: 'suresh@audit.com',
      role: 'AUDITOR',
      status: 'INACTIVE',
      lastLogin: '01 Oct 2026 15:20',
      deviceCount: 1,
      risk: 'LOW'
    },
    {
      id: 'USR-1006',
      username: 'Admin',
      email: 'admin@company.com',
      role: 'ADMIN',
      status: 'ACTIVE',
      lastLogin: '04 Oct 2026 10:02',
      deviceCount: 2,
      risk: 'LOW'
    },
    {
      id: 'USR-1007',
      username: 'Vignesh Raj',
      email: 'vignesh@cloudsystems.com',
      role: 'SUPPLIER',
      status: 'SUSPENDED',
      lastLogin: '28 Sep 2026 11:15',
      deviceCount: 2,
      risk: 'CRITICAL'
    }
  ]);

  readonly searchTerm = signal('');
  readonly selectedRole = signal('ALL');
  readonly selectedStatus = signal('ALL');

  readonly filteredUsers = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const role = this.selectedRole();
    const status = this.selectedStatus();

    return this.users().filter(user => {
      const matchesSearch =
        !search ||
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.id.toLowerCase().includes(search);

      const matchesRole =
        role === 'ALL' || user.role === role;

      const matchesStatus =
        status === 'ALL' || user.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  });

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

  readonly highRiskUsers = computed(
    () =>
      this.users().filter(
        user => user.risk === 'HIGH' || user.risk === 'CRITICAL'
      ).length
  );

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedRole.set('ALL');
    this.selectedStatus.set('ALL');
  }

  activateUser(user: SystemUser): void {
    this.updateUserStatus(user.id, 'ACTIVE');
    this.showMessage(`${user.username} activated successfully`);
  }

  deactivateUser(user: SystemUser): void {
    this.updateUserStatus(user.id, 'INACTIVE');
    this.showMessage(`${user.username} deactivated`);
  }

  suspendUser(user: SystemUser): void {
    this.updateUserStatus(user.id, 'SUSPENDED');
    this.showMessage(`${user.username} suspended`);
  }

  changeRole(user: SystemUser, role: string): void {
    this.users.update(users =>
      users.map(item =>
        item.id === user.id
          ? { ...item, role: role as SystemUser['role'] }
          : item
      )
    );

    this.showMessage(`${user.username} role changed to ${role}`);
  }

  private updateUserStatus(
    userId: string,
    status: SystemUser['status']
  ): void {
    this.users.update(users =>
      users.map(user =>
        user.id === userId
          ? { ...user, status }
          : user
      )
    );
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  getRiskClass(risk: string): string {
    return risk.toLowerCase();
  }

  getRoleClass(role: string): string {
    return role.toLowerCase();
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2500
    });
  }
}