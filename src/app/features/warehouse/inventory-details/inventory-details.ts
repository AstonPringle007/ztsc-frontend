import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  warehouseZone: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  status: string;
  supplier: string;
  supplierId: string;
  lastUpdated: string;
  description: string;
}

interface StockMovement {
  date: string;
  type: string;
  quantity: number;
  reference: string;
  user: string;
  remarks: string;
}

@Component({
  selector: 'app-inventory-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './inventory-details.html',
  styleUrl: './inventory-details.scss'
})
export class InventoryDetailsComponent {
  protected readonly Math = Math;
  itemId = signal('');

  item = signal<InventoryItem>({
    id: 'INV-1001',
    name: 'Laptop - Dell Latitude 5540',
    category: 'IT Equipment',
    location: 'Warehouse A',
    warehouseZone: 'Zone A-03',
    quantity: 42,
    minStock: 10,
    maxStock: 100,
    unitPrice: 85000,
    status: 'IN_STOCK',
    supplier: 'Tech Solutions Ltd',
    supplierId: 'SUP-1001',
    lastUpdated: '04 Oct 2026',
    description:
      'Dell Latitude business laptops used for employee workstations and enterprise operations.'
  });

  stockMovements = signal<StockMovement[]>([
    {
      date: '04 Oct 2026',
      type: 'RECEIVED',
      quantity: 20,
      reference: 'PO-2026-1042',
      user: 'Pringle',
      remarks: 'New purchase order received'
    },
    {
      date: '28 Sep 2026',
      type: 'ISSUED',
      quantity: -5,
      reference: 'REQ-2026-088',
      user: 'Arun',
      remarks: 'Issued to IT department'
    },
    {
      date: '20 Sep 2026',
      type: 'RECEIVED',
      quantity: 15,
      reference: 'PO-2026-0981',
      user: 'Pringle',
      remarks: 'Warehouse replenishment'
    },
    {
      date: '12 Sep 2026',
      type: 'ISSUED',
      quantity: -8,
      reference: 'REQ-2026-071',
      user: 'Kumar',
      remarks: 'Issued to Finance department'
    },
    {
      date: '02 Sep 2026',
      type: 'RECEIVED',
      quantity: 20,
      reference: 'PO-2026-0912',
      user: 'Pringle',
      remarks: 'Initial stock received'
    }
  ]);

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.itemId.set(params['id'] || 'INV-1001');
    });
  }

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

  getMovementIcon(type: string): string {
    switch (type) {
      case 'RECEIVED':
        return 'south_west';
      case 'ISSUED':
        return 'north_east';
      default:
        return 'sync_alt';
    }
  }

  getMovementClass(type: string): string {
    return type === 'RECEIVED'
      ? 'received'
      : 'issued';
  }

  adjustStock(): void {
    console.log('Mock stock adjustment for:', this.itemId());
  }

  editItem(): void {
    console.log('Mock edit inventory item:', this.itemId());
  }

  createPurchaseRequest(): void {
    console.log(
      'Mock purchase request for inventory item:',
      this.itemId()
    );
  }
}