import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  PurchaseRequest,
  CreatePurchaseRequest
} from '../models/purchase-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {

  private readonly http = inject(HttpClient);

  private readonly API_URL =
    `${environment.apiUrl}/procurement/purchase-requests`;

  getAll(): Observable<PurchaseRequest[]> {
    return this.http.get<PurchaseRequest[]>(this.API_URL);
  }

  getById(id: number): Observable<PurchaseRequest> {
    return this.http.get<PurchaseRequest>(
      `${this.API_URL}/${id}`
    );
  }

  getMyRequests(): Observable<PurchaseRequest[]> {
    return this.http.get<PurchaseRequest[]>(
      `${this.API_URL}/my`
    );
  }

  getByStatus(status: string): Observable<PurchaseRequest[]> {
    return this.http.get<PurchaseRequest[]>(
      `${this.API_URL}/status/${status}`
    );
  }

  create(
    request: CreatePurchaseRequest
  ): Observable<PurchaseRequest> {

    return this.http.post<PurchaseRequest>(
      this.API_URL,
      request
    );
  }

  approve(id: number): Observable<PurchaseRequest> {
    return this.http.patch<PurchaseRequest>(
      `${this.API_URL}/${id}/approve`,
      {}
    );
  }

  reject(id: number): Observable<PurchaseRequest> {
    return this.http.patch<PurchaseRequest>(
      `${this.API_URL}/${id}/reject`,
      {}
    );
  }
}