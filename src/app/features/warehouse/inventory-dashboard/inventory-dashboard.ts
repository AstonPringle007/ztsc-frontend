import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  minStock: number;
  unitPrice: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  lastUpdated: string;
}

@Component({
  selector: 'app-inventory-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './inventory-dashboard.html',
  styleUrl: './inventory-dashboard.scss'
})
export class InventoryDashboardComponent {

  inventory = signal<InventoryItem[]>([
    {
      id: 'INV-1001',
      name: 'Laptop - Dell Latitude 5540',
      category: 'IT Equipment',
      location: 'Warehouse A',
      quantity: 42,
      minStock: 10,
      unitPrice: 85000,
      status: 'IN_STOCK',
      lastUpdated: '04 Oct 2026'
    },
    {
      id: 'INV-1002',
      name: 'Barcode Scanner',
      category: 'Warehouse Equipment',
      location: 'Warehouse A',
      quantity: 8,
      minStock: 10,
      unitPrice: 12500,
      status: 'LOW_STOCK',
      lastUpdated: '04 Oct 2026'
    },
    {
      id: 'INV-1003',
      name: 'Network Security Device',
      category: 'Security',
      location: 'Warehouse B',
      quantity: 15,
      minStock: 5,
      unitPrice: 32000,
      status: 'IN_STOCK',
      lastUpdated: '03 Oct 2026'
    },
    {
      id: 'INV-1004',
      name: 'Office Chair',
      category: 'Office Supplies',
      location: 'Warehouse C',
      quantity: 0,
      minStock: 10,
      unitPrice: 7500,
      status: 'OUT_OF_STOCK',
      lastUpdated: '02 Oct 2026'
    },
    {
      id: 'INV-1005',
      name: 'Wireless Keyboard',
      category: 'IT Equipment',
      location: 'Warehouse A',
      quantity: 6,
      minStock: 10,
      unitPrice: 2500,
      status: 'LOW_STOCK',
      lastUpdated: '02 Oct 2026'
    },
    {
      id: 'INV-1006',
      name: 'Server Rack',
      category: 'Infrastructure',
      location: 'Warehouse B',
      quantity: 12,
      minStock: 3,
      unitPrice: 45000,
      status: 'IN_STOCK',
      lastUpdated: '01 Oct 2026'
    }
  ]);

  totalItems = computed(() => this.inventory().length);

  inStockItems = computed(() =>
    this.inventory().filter(item => item.status === 'IN_STOCK').length
  );

  lowStockItems = computed(() =>
    this.inventory().filter(item => item.status === 'LOW_STOCK').length
  );

  outOfStockItems = computed(() =>
    this.inventory().filter(item => item.status === 'OUT_OF_STOCK').length
  );

  inventoryValue = computed(() =>
    this.inventory().reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    )
  );

  lowStockAlerts = computed(() =>
    this.inventory().filter(item =>
      item.quantity > 0 && item.quantity <= item.minStock
    )
  );

  recentItems = computed(() =>
    this.inventory().slice(0, 5)
  );

  getStatusLabel(status: string): string {
    switch (status) {
      case 'IN_STOCK':
        return 'In Stock';
      case 'LOW_STOCK':
        return 'Low Stock';
      case 'OUT_OF_STOCK':
        return 'Out of Stock';
      default:
        return status;
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'IN_STOCK':
        return 'check_circle';
      case 'LOW_STOCK':
        return 'warning';
      case 'OUT_OF_STOCK':
        return 'error';
      default:
        return 'inventory_2';
    }
  }
}