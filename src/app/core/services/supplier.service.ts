import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  Supplier,
  CreateSupplier
} from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private readonly http = inject(HttpClient);

  private readonly API_URL =
    `${environment.apiUrl}/suppliers`;

  getAll(): Observable<Supplier[]> {

    return this.http.get<Supplier[]>(
      this.API_URL
    );
  }

  getById(id: number): Observable<Supplier> {

    return this.http.get<Supplier>(
      `${this.API_URL}/${id}`
    );
  }

  getByStatus(
    status: string
  ): Observable<Supplier[]> {

    return this.http.get<Supplier[]>(
      `${this.API_URL}/status/${status}`
    );
  }

  getByCategory(
    category: string
  ): Observable<Supplier[]> {

    return this.http.get<Supplier[]>(
      `${this.API_URL}/category/${category}`
    );
  }

  create(
    supplier: CreateSupplier
  ): Observable<Supplier> {

    return this.http.post<Supplier>(
      this.API_URL,
      supplier
    );
  }

  update(
    id: number,
    supplier: CreateSupplier
  ): Observable<Supplier> {

    return this.http.put<Supplier>(
      `${this.API_URL}/${id}`,
      supplier
    );
  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.API_URL}/${id}`
    );
  }
}