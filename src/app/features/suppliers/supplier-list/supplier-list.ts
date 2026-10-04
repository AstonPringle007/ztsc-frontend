import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  status: string;
  riskLevel: string;
  rating: number;
  totalOrders: number;
}

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.scss'
})
export class SupplierListComponent {

  private readonly router = inject(Router);

  searchText = '';
  selectedStatus = 'ALL';
  selectedRisk = 'ALL';

  suppliers = signal<Supplier[]>([
    {
      id: 'SUP-1001',
      name: 'Tech Solutions Ltd',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@techsolutions.com',
      phone: '+91 98765 43210',
      category: 'IT Equipment',
      location: 'Chennai',
      status: 'ACTIVE',
      riskLevel: 'LOW',
      rating: 4.8,
      totalOrders: 24
    },
    {
      id: 'SUP-1002',
      name: 'SecureTech Systems',
      contactPerson: 'Arun Kumar',
      email: 'arun@securetech.com',
      phone: '+91 98765 12345',
      category: 'Security',
      location: 'Bangalore',
      status: 'ACTIVE',
      riskLevel: 'LOW',
      rating: 4.6,
      totalOrders: 18
    },
    {
      id: 'SUP-1003',
      name: 'Industrial Systems',
      contactPerson: 'Suresh Kumar',
      email: 'suresh@industrialsystems.com',
      phone: '+91 99887 66554',
      category: 'Warehouse',
      location: 'Coimbatore',
      status: 'ACTIVE',
      riskLevel: 'MEDIUM',
      rating: 4.2,
      totalOrders: 15
    },
    {
      id: 'SUP-1004',
      name: 'Cloud Systems India',
      contactPerson: 'Vignesh Raj',
      email: 'vignesh@cloudsystems.com',
      phone: '+91 97865 44321',
      category: 'Cloud Services',
      location: 'Hyderabad',
      status: 'ACTIVE',
      riskLevel: 'LOW',
      rating: 4.7,
      totalOrders: 31
    },
    {
      id: 'SUP-1005',
      name: 'Office World',
      contactPerson: 'Karthik S',
      email: 'karthik@officeworld.com',
      phone: '+91 96543 21098',
      category: 'Office Supplies',
      location: 'Chennai',
      status: 'SUSPENDED',
      riskLevel: 'HIGH',
      rating: 3.5,
      totalOrders: 9
    },
    {
      id: 'SUP-1006',
      name: 'Warehouse Pro',
      contactPerson: 'Manoj Kumar',
      email: 'manoj@warehousepro.com',
      phone: '+91 95678 12340',
      category: 'Storage',
      location: 'Madurai',
      status: 'ACTIVE',
      riskLevel: 'MEDIUM',
      rating: 4.1,
      totalOrders: 12
    }
  ]);

  displayedColumns = [
    'id',
    'supplier',
    'category',
    'location',
    'status',
    'risk',
    'rating',
    'orders',
    'actions'
  ];

  filteredSuppliers = computed(() => {
    const search = this.searchText.trim().toLowerCase();

    return this.suppliers().filter(supplier => {
      const matchesSearch =
        !search ||
        supplier.id.toLowerCase().includes(search) ||
        supplier.name.toLowerCase().includes(search) ||
        supplier.contactPerson.toLowerCase().includes(search) ||
        supplier.category.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        supplier.status === this.selectedStatus;

      const matchesRisk =
        this.selectedRisk === 'ALL' ||
        supplier.riskLevel === this.selectedRisk;

      return matchesSearch && matchesStatus && matchesRisk;
    });
  });

  activeSuppliers = computed(
    () => this.suppliers().filter(s => s.status === 'ACTIVE').length
  );

  highRiskSuppliers = computed(
    () => this.suppliers().filter(s => s.riskLevel === 'HIGH').length
  );

  totalOrders = computed(
    () => this.suppliers().reduce((total, s) => total + s.totalOrders, 0)
  );

  constructor() {}

  createSupplier(): void {
    this.router.navigate(['/suppliers/create']);
  }

  viewSupplier(supplier: Supplier): void {
    this.router.navigate(['/suppliers/details', supplier.id]);
  }

  editSupplier(supplier: Supplier): void {
    console.log('Edit supplier:', supplier);
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedStatus = 'ALL';
    this.selectedRisk = 'ALL';
  }
}