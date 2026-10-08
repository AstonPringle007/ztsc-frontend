import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

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

import { MatTooltipModule } from '@angular/material/tooltip';

import { SupplierService } from '../../../core/services/supplier.service';

import {
  Supplier
} from '../../../core/models/supplier.model';


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
    MatTooltipModule
  ],

  templateUrl: './supplier-list.html',

  styleUrl: './supplier-list.scss'
})
export class SupplierListComponent {

  private readonly router =
    inject(Router);

  private readonly supplierService =
    inject(SupplierService);


  searchText = '';

  selectedStatus = 'ALL';

  selectedRisk = 'ALL';


  suppliers =
    signal<Supplier[]>([]);


  loading = false;

  errorMessage = '';


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


  ngOnInit(): void {

    this.loadSuppliers();

  }


  loadSuppliers(): void {

    this.loading = true;

    this.errorMessage = '';

    this.supplierService
      .getAll()
      .subscribe({

        next: (suppliers) => {

          this.suppliers.set(suppliers);

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Failed to load suppliers:',
            error
          );

          this.loading = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to load suppliers.';
        }
      });
  }


  filteredSuppliers =
    computed(() => {

      const search =
        this.searchText
          .trim()
          .toLowerCase();


      return this.suppliers()
        .filter(supplier => {

          const matchesSearch =
            !search ||

            String(supplier.id)
              .toLowerCase()
              .includes(search) ||

            supplier.supplierCode
              .toLowerCase()
              .includes(search) ||

            supplier.name
              .toLowerCase()
              .includes(search) ||

            supplier.contactPerson
              .toLowerCase()
              .includes(search) ||

            supplier.category
              .toLowerCase()
              .includes(search);


          const matchesStatus =
            this.selectedStatus === 'ALL' ||
            supplier.status === this.selectedStatus;


          /*
           * Risk level is not currently returned
           * by the Spring Boot Supplier entity.
           *
           * Keep this filter disabled until risk
           * data is connected to the security module.
           */
          const matchesRisk =
            this.selectedRisk === 'ALL';


          return (
            matchesSearch &&
            matchesStatus &&
            matchesRisk
          );

        });

    });


  activeSuppliers =
    computed(
      () =>
        this.suppliers()
          .filter(
            supplier =>
              supplier.status === 'ACTIVE'
          )
          .length
    );


  suspendedSuppliers =
    computed(
      () =>
        this.suppliers()
          .filter(
            supplier =>
              supplier.status === 'SUSPENDED'
          )
          .length
    );


  averageRating =
    computed(() => {

      const suppliers =
        this.suppliers();

      if (suppliers.length === 0) {

        return 0;

      }

      const total =
        suppliers.reduce(
          (sum, supplier) =>
            sum + (supplier.rating || 0),
          0
        );

      return total / suppliers.length;

    });


  createSupplier(): void {

    this.router.navigate([
      '/suppliers/create'
    ]);

  }


  viewSupplier(
    supplier: Supplier
  ): void {

    this.router.navigate([
      '/suppliers/details',
      supplier.id
    ]);

  }


  editSupplier(
    supplier: Supplier
  ): void {

    this.router.navigate([
      '/suppliers/details',
      supplier.id
    ]);

  }


  clearFilters(): void {

    this.searchText = '';

    this.selectedStatus = 'ALL';

    this.selectedRisk = 'ALL';

  }


  refreshSuppliers(): void {

    this.loadSuppliers();

  }

}