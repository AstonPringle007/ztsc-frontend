export interface Supplier {
  id: number;
  name: string;
  supplierCode: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  category: string;
  status: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSupplier {
  name: string;
  supplierCode: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  category: string;
  status: string;
  rating: number;
}