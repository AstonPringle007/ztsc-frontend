export interface PurchaseRequest {
  id: number;
  title: string;
  productName: string;
  category: string;
  supplier: string;
  quantity: number;
  amount: number;
  description: string;
  priority: string;
  requiredDate: string;
  justification: string;
  status: string;
  requestedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface CreatePurchaseRequest {
  title: string;
  productName: string;
  category: string;
  supplier: string;
  quantity: number;
  amount: number;
  description: string;
  priority: string;
  requiredDate: string;
  justification: string;
}