import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

interface SupplierOrder {
  id: string;
  description: string;
  date: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-supplier-details',
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
  templateUrl: './supplier-details.html',
  styleUrl: './supplier-details.scss'
})
export class SupplierDetailsComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly supplierId = signal(
    this.route.snapshot.paramMap.get('id') ?? 'SUP-1001'
  );

  private readonly supplierData = [
    {
      id: 'SUP-1001',
      name: 'Tech Solutions Ltd',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@techsolutions.com',
      phone: '+91 98765 43210',
      category: 'IT Equipment',
      location: 'Chennai, Tamil Nadu',
      address: 'Anna Salai, Chennai, Tamil Nadu',
      status: 'ACTIVE',
      riskLevel: 'LOW',
      rating: 4.8,
      totalOrders: 24,
      completedOrders: 22,
      pendingOrders: 2,
      totalValue: 1850000,
      registrationDate: '12 Jan 2024',
      taxId: 'GST-33ABCDE1234F1Z5'
    },
    {
      id: 'SUP-1002',
      name: 'SecureTech Systems',
      contactPerson: 'Arun Kumar',
      email: 'arun@securetech.com',
      phone: '+91 98765 12345',
      category: 'Security',
      location: 'Bangalore, Karnataka',
      address: 'Electronic City, Bangalore',
      status: 'ACTIVE',
      riskLevel: 'LOW',
      rating: 4.6,
      totalOrders: 18,
      completedOrders: 16,
      pendingOrders: 2,
      totalValue: 1240000,
      registrationDate: '08 Mar 2024',
      taxId: 'GST-29ABCDE5678F1Z2'
    },
    {
      id: 'SUP-1003',
      name: 'Industrial Systems',
      contactPerson: 'Suresh Kumar',
      email: 'suresh@industrialsystems.com',
      phone: '+91 99887 66554',
      category: 'Warehouse',
      location: 'Coimbatore, Tamil Nadu',
      address: 'Peelamedu, Coimbatore',
      status: 'ACTIVE',
      riskLevel: 'MEDIUM',
      rating: 4.2,
      totalOrders: 15,
      completedOrders: 13,
      pendingOrders: 2,
      totalValue: 920000,
      registrationDate: '19 Jun 2024',
      taxId: 'GST-33ABCDE9012F1Z7'
    },
    {
      id: 'SUP-1004',
      name: 'Cloud Systems India',
      contactPerson: 'Vignesh Raj',
      email: 'vignesh@cloudsystems.com',
      phone: '+91 97865 44321',
      category: 'Cloud Services',
      location: 'Hyderabad, Telangana',
      address: 'Hitech City, Hyderabad',
      status: 'ACTIVE',
      riskLevel: 'LOW',
      rating: 4.7,
      totalOrders: 31,
      completedOrders: 29,
      pendingOrders: 2,
      totalValue: 2650000,
      registrationDate: '03 Feb 2024',
      taxId: 'GST-36ABCDE3456F1Z9'
    },
    {
      id: 'SUP-1005',
      name: 'Office World',
      contactPerson: 'Karthik S',
      email: 'karthik@officeworld.com',
      phone: '+91 96543 21098',
      category: 'Office Supplies',
      location: 'Chennai, Tamil Nadu',
      address: 'Guindy, Chennai',
      status: 'SUSPENDED',
      riskLevel: 'HIGH',
      rating: 3.5,
      totalOrders: 9,
      completedOrders: 7,
      pendingOrders: 2,
      totalValue: 340000,
      registrationDate: '21 Sep 2024',
      taxId: 'GST-33ABCDE7890F1Z3'
    },
    {
      id: 'SUP-1006',
      name: 'Warehouse Pro',
      contactPerson: 'Manoj Kumar',
      email: 'manoj@warehousepro.com',
      phone: '+91 95678 12340',
      category: 'Storage',
      location: 'Madurai, Tamil Nadu',
      address: 'Mattuthavani, Madurai',
      status: 'ACTIVE',
      riskLevel: 'MEDIUM',
      rating: 4.1,
      totalOrders: 12,
      completedOrders: 10,
      pendingOrders: 2,
      totalValue: 780000,
      registrationDate: '15 Nov 2024',
      taxId: 'GST-33ABCDE4567F1Z8'
    }
  ];

  supplier = computed(() =>
    this.supplierData.find(s => s.id === this.supplierId()) ??
    this.supplierData[0]
  );

  orders: SupplierOrder[] = [
    {
      id: 'PO-2026-1042',
      description: 'Laptop Equipment',
      date: '04 Oct 2026',
      amount: 245000,
      status: 'PROCESSING'
    },
    {
      id: 'PO-2026-1035',
      description: 'Network Accessories',
      date: '28 Sep 2026',
      amount: 85000,
      status: 'COMPLETED'
    },
    {
      id: 'PO-2026-1021',
      description: 'Development Workstations',
      date: '15 Sep 2026',
      amount: 320000,
      status: 'COMPLETED'
    },
    {
      id: 'PO-2026-1008',
      description: 'IT Infrastructure',
      date: '02 Sep 2026',
      amount: 175000,
      status: 'COMPLETED'
    }
  ];

  editSupplier(): void {
    console.log('Edit supplier:', this.supplier().id);
  }

  contactSupplier(): void {
    window.location.href = `mailto:${this.supplier().email}`;
  }
}