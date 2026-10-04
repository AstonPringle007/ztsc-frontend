import { Routes } from '@angular/router';

export const routes: Routes = [
  // =========================
  // AUTH
  // =========================
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.RegisterComponent),
  },

  // =========================
  // MAIN APPLICATION
  // =========================
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then(
        (m) => m.MainLayoutComponent,
      ),

    children: [
      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(
            (m) => m.DashboardComponent,
          ),
      },

      // =========================
      // PROCUREMENT
      // =========================
      {
        path: 'procurement',
        loadComponent: () =>
          import(
            './features/procurement/purchase-request-list/purchase-request-list'
          ).then((m) => m.PurchaseRequestListComponent),
      },
      {
        path: 'procurement/create',
        loadComponent: () =>
          import(
            './features/procurement/purchase-request-create/purchase-request-create'
          ).then((m) => m.PurchaseRequestCreateComponent),
      },
      {
        path: 'procurement/details/:id',
        loadComponent: () =>
          import(
            './features/procurement/purchase-request-details/purchase-request-details'
          ).then((m) => m.PurchaseRequestDetailsComponent),
      },

      // =========================
      // SUPPLIERS
      // =========================
      {
        path: 'suppliers',
        loadComponent: () =>
          import('./features/suppliers/supplier-list/supplier-list').then(
            (m) => m.SupplierListComponent,
          ),
      },
      {
        path: 'suppliers/create',
        loadComponent: () =>
          import('./features/suppliers/supplier-create/supplier-create').then(
            (m) => m.SupplierCreateComponent,
          ),
      },
      {
        path: 'suppliers/details/:id',
        loadComponent: () =>
          import('./features/suppliers/supplier-details/supplier-details').then(
            (m) => m.SupplierDetailsComponent,
          ),
      },

      // =========================
      // WAREHOUSE
      // =========================
      {
        path: 'warehouse',
        loadComponent: () =>
          import(
            './features/warehouse/inventory-dashboard/inventory-dashboard'
          ).then((m) => m.InventoryDashboardComponent),
      },
      {
        path: 'warehouse/inventory',
        loadComponent: () =>
          import('./features/warehouse/inventory-list/inventory-list').then(
            (m) => m.InventoryListComponent,
          ),
      },
      {
        path: 'warehouse/inventory/:id',
        loadComponent: () =>
          import(
            './features/warehouse/inventory-details/inventory-details'
          ).then((m) => m.InventoryDetailsComponent),
      },

      // =========================
      // FINANCE
      // =========================
      {
        path: 'finance',
        loadComponent: () =>
          import('./features/finance/finance-dashboard/finance-dashboard').then(
            (m) => m.FinanceDashboardComponent,
          ),
      },
      {
        path: 'finance/payments',
        loadComponent: () =>
          import('./features/finance/payment-list/payment-list').then(
            (m) => m.PaymentListComponent,
          ),
      },
      {
        path: 'finance/payments/:id',
        loadComponent: () =>
          import('./features/finance/payment-details/payment-details').then(
            (m) => m.PaymentDetailsComponent,
          ),
      },

      // =========================
      // SECURITY
      // =========================
      {
        path: 'security',
        loadComponent: () =>
          import('./features/security/devices/devices').then(
            (m) => m.DevicesComponent,
          ),
      },
      {
        path: 'security/events',
        loadComponent: () =>
          import('./features/security/security-events/security-events').then(
            (m) => m.SecurityEventsComponent,
          ),
      },
      {
        path: 'security/anomalies',
        loadComponent: () =>
          import(
            './features/security/anomaly-detection/anomaly-detection'
          ).then((m) => m.AnomalyDetectionComponent),
      },

      // =========================
      // AUDIT
      // =========================
      {
        path: 'audit-logs',
        loadComponent: () =>
          import('./features/security/audit-logs/audit-logs').then(
            (m) => m.AuditLogsComponent,
          ),
      },

      // =========================
      // ADMIN
      // =========================
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/admin/admin-dashboard/admin-dashboard').then(
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: 'admin/users',
        loadComponent: () =>
          import('./features/admin/user-management/user-management').then(
            (m) => m.UserManagementComponent,
          ),
      },
      {
        path: 'admin/settings',
        loadComponent: () =>
          import('./features/admin/system-settings/system-settings').then(
            (m) => m.SystemSettingsComponent,
          ),
      },

      // =========================
      // DEFAULT
      // =========================
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // =========================
  // UNKNOWN URL
  // =========================
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found').then(
        (m) => m.NotFoundComponent,
      ),
  },
];