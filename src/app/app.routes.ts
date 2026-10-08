import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  // =====================================================
  // AUTH
  // =====================================================

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then((m) => m.LoginComponent),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register')
        .then((m) => m.RegisterComponent),
  },


  // =====================================================
  // MAIN APPLICATION
  // =====================================================

  {
    path: '',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./layouts/main-layout/main-layout')
        .then((m) => m.MainLayoutComponent),

    children: [

      // ===================================================
      // DASHBOARD
      // All authenticated users
      // ===================================================

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard')
            .then((m) => m.DashboardComponent),
      },


      // ===================================================
      // PROCUREMENT
      // PROCUREMENT / SUPPLIER / ADMIN
      // ===================================================

      {
        path: 'procurement',

        canActivate: [roleGuard],

        data: {
          roles: ['PROCUREMENT', 'SUPPLIER', 'ADMIN'],
        },

        loadComponent: () =>
          import(
            './features/procurement/purchase-request-list/purchase-request-list'
          ).then((m) => m.PurchaseRequestListComponent),
      },

      {
        path: 'procurement/create',

        canActivate: [roleGuard],

        data: {
          roles: ['PROCUREMENT', 'ADMIN'],
        },

        loadComponent: () =>
          import(
            './features/procurement/purchase-request-create/purchase-request-create'
          ).then((m) => m.PurchaseRequestCreateComponent),
      },

      {
        path: 'procurement/details/:id',

        canActivate: [roleGuard],

        data: {
          roles: ['PROCUREMENT', 'SUPPLIER', 'ADMIN'],
        },

        loadComponent: () =>
          import(
            './features/procurement/purchase-request-details/purchase-request-details'
          ).then((m) => m.PurchaseRequestDetailsComponent),
      },


      // ===================================================
      // SUPPLIERS
      // PROCUREMENT / SUPPLIER / ADMIN
      // ===================================================

      {
        path: 'suppliers',

        canActivate: [roleGuard],

        data: {
          roles: ['PROCUREMENT', 'SUPPLIER', 'ADMIN'],
        },

        loadComponent: () =>
          import('./features/suppliers/supplier-list/supplier-list')
            .then((m) => m.SupplierListComponent),
      },

      {
        path: 'suppliers/create',

        canActivate: [roleGuard],

        data: {
          roles: ['PROCUREMENT', 'ADMIN'],
        },

        loadComponent: () =>
          import('./features/suppliers/supplier-create/supplier-create')
            .then((m) => m.SupplierCreateComponent),
      },

      {
        path: 'suppliers/details/:id',

        canActivate: [roleGuard],

        data: {
          roles: ['PROCUREMENT', 'SUPPLIER', 'ADMIN'],
        },

        loadComponent: () =>
          import('./features/suppliers/supplier-details/supplier-details')
            .then((m) => m.SupplierDetailsComponent),
      },


      // ===================================================
      // WAREHOUSE
      // WAREHOUSE / PROCUREMENT / ADMIN
      // ===================================================

      {
        path: 'warehouse',

        canActivate: [roleGuard],

        data: {
          roles: ['WAREHOUSE', 'PROCUREMENT', 'ADMIN'],
        },

        loadComponent: () =>
          import(
            './features/warehouse/inventory-dashboard/inventory-dashboard'
          ).then((m) => m.InventoryDashboardComponent),
      },

      {
        path: 'warehouse/inventory',

        canActivate: [roleGuard],

        data: {
          roles: ['WAREHOUSE', 'PROCUREMENT', 'ADMIN'],
        },

        loadComponent: () =>
          import('./features/warehouse/inventory-list/inventory-list')
            .then((m) => m.InventoryListComponent),
      },

      {
        path: 'warehouse/inventory/:id',

        canActivate: [roleGuard],

        data: {
          roles: ['WAREHOUSE', 'PROCUREMENT', 'ADMIN'],
        },

        loadComponent: () =>
          import(
            './features/warehouse/inventory-details/inventory-details'
          ).then((m) => m.InventoryDetailsComponent),
      },


      // ===================================================
      // FINANCE
      // FINANCE / PROCUREMENT / ADMIN
      // ===================================================

      {
        path: 'finance',

        canActivate: [roleGuard],

        data: {
          roles: ['FINANCE', 'PROCUREMENT', 'ADMIN'],
        },

        loadComponent: () =>
          import('./features/finance/finance-dashboard/finance-dashboard')
            .then((m) => m.FinanceDashboardComponent),
      },

      {
        path: 'finance/payments',

        canActivate: [roleGuard],

        data: {
          roles: ['FINANCE', 'PROCUREMENT', 'ADMIN'],
        },

        loadComponent: () =>
          import('./features/finance/payment-list/payment-list')
            .then((m) => m.PaymentListComponent),
      },

      {
        path: 'finance/payments/:id',

        canActivate: [roleGuard],

        data: {
          roles: ['FINANCE', 'PROCUREMENT', 'ADMIN'],
        },

        loadComponent: () =>
          import('./features/finance/payment-details/payment-details')
            .then((m) => m.PaymentDetailsComponent),
      },


      // ===================================================
      // SECURITY
      // ADMIN / AUDITOR / PROCUREMENT
      // ===================================================

      {
        path: 'security',

        canActivate: [roleGuard],

        data: {
          roles: ['ADMIN', 'AUDITOR', 'PROCUREMENT'],
        },

        loadComponent: () =>
          import('./features/security/devices/devices')
            .then((m) => m.DevicesComponent),
      },

      {
        path: 'security/events',

        canActivate: [roleGuard],

        data: {
          roles: ['ADMIN', 'AUDITOR', 'PROCUREMENT'],
        },

        loadComponent: () =>
          import('./features/security/security-events/security-events')
            .then((m) => m.SecurityEventsComponent),
      },

      {
        path: 'security/anomalies',

        canActivate: [roleGuard],

        data: {
          roles: ['ADMIN', 'AUDITOR', 'PROCUREMENT'],
        },

        loadComponent: () =>
          import(
            './features/security/anomaly-detection/anomaly-detection'
          ).then((m) => m.AnomalyDetectionComponent),
      },


      // ===================================================
      // AUDIT
      // ADMIN / AUDITOR
      // ===================================================

      {
        path: 'audit-logs',

        canActivate: [roleGuard],

        data: {
          roles: ['ADMIN', 'AUDITOR'],
        },

        loadComponent: () =>
          import('./features/security/audit-logs/audit-logs')
            .then((m) => m.AuditLogsComponent),
      },


      // ===================================================
      // ADMIN
      // ADMIN ONLY
      // ===================================================

      {
        path: 'admin',

        canActivate: [roleGuard],

        data: {
          roles: ['ADMIN'],
        },

        loadComponent: () =>
          import('./features/admin/admin-dashboard/admin-dashboard')
            .then((m) => m.AdminDashboardComponent),
      },

      {
        path: 'admin/users',

        canActivate: [roleGuard],

        data: {
          roles: ['ADMIN'],
        },

        loadComponent: () =>
          import('./features/admin/user-management/user-management')
            .then((m) => m.UserManagementComponent),
      },

      {
        path: 'admin/settings',

        canActivate: [roleGuard],

        data: {
          roles: ['ADMIN'],
        },

        loadComponent: () =>
          import('./features/admin/system-settings/system-settings')
            .then((m) => m.SystemSettingsComponent),
      },


      // ===================================================
      // DEFAULT
      // ===================================================

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },


  // =====================================================
  // UNKNOWN URL
  // =====================================================

  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found')
        .then((m) => m.NotFoundComponent),
  },
];