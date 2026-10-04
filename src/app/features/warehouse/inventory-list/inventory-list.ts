import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

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
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './inventory-list.html',
  styleUrl: './inventory-list.scss'
})
export class InventoryListComponent {

  constructor(private router: Router) {}

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
    },
    {
      id: 'INV-1007',
      name: 'Desktop Monitor',
      category: 'IT Equipment',
      location: 'Warehouse A',
      quantity: 25,
      minStock: 8,
      unitPrice: 18500,
      status: 'IN_STOCK',
      lastUpdated: '30 Sep 2026'
    },
    {
      id: 'INV-1008',
      name: 'Network Switch',
      category: 'Networking',
      location: 'Warehouse B',
      quantity: 4,
      minStock: 8,
      unitPrice: 22000,
      status: 'LOW_STOCK',
      lastUpdated: '29 Sep 2026'
    }
  ]);

  searchTerm = signal('');
  selectedCategory = signal('ALL');
  selectedStatus = signal('ALL');
  selectedLocation = signal('ALL');

  filteredInventory = computed(() => {

    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();
    const status = this.selectedStatus();
    const location = this.selectedLocation();

    return this.inventory().filter(item => {

      const matchesSearch =
        !search ||
        item.id.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search);

      const matchesCategory =
        category === 'ALL' || item.category === category;

      const matchesStatus =
        status === 'ALL' || item.status === status;

      const matchesLocation =
        location === 'ALL' || item.location === location;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesLocation
      );
    });
  });

  totalItems = computed(() => this.inventory().length);

  totalQuantity = computed(() =>
    this.inventory().reduce((total, item) => total + item.quantity, 0)
  );

  lowStockCount = computed(() =>
    this.inventory().filter(item => item.status === 'LOW_STOCK').length
  );

  outOfStockCount = computed(() =>
    this.inventory().filter(item => item.status === 'OUT_OF_STOCK').length
  );

  categories = computed(() => [
    ...new Set(this.inventory().map(item => item.category))
  ]);

  locations = computed(() => [
    ...new Set(this.inventory().map(item => item.location))
  ]);

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('ALL');
    this.selectedStatus.set('ALL');
    this.selectedLocation.set('ALL');
  }

  viewDetails(item: InventoryItem): void {
    this.router.navigate(['/warehouse/inventory', item.id]);
  }

  editItem(item: InventoryItem): void {
    console.log('Mock edit inventory item:', item);
  }

  adjustStock(item: InventoryItem): void {
    console.log('Mock stock adjustment:', item);
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
}