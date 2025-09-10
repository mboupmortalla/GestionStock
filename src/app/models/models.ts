export enum StockType {
  IN = 'IN',
  OUT = 'OUT'
}

export enum CommandType {
  PURCHASE = 'PURCHASE',
  SELLING = 'SELLING'
}

export enum CommandStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER',
  USER = 'USER'
}


export interface Product {
  productId: string;
  name: string;
  code:string;
  description: string;
  categoryId: string;
  sellingPrice: number;
  purchasePrice: number;
  quantity: number;
}

export interface Category {
  categoryId: string;
  name: string;
  description: string;
}

export interface Stock{
  productId: string;
  stockId: string;
  clientId: string;
  type:StockType;            //{"IN","OUT"}
  providerId: string;
  quantity: number;
  date: Date;
  UserId: string;
}

export interface Command{
  commandId: string;
  type: CommandType;       //{"PURCHASE","SELLING"}
  date: Date;
  status: CommandStatus;     //{"PENDING", "VALIDATED", "DELIVERED", "CANCELLED"}
  products: Product[] | null;
  providerId: string;
  clientId: string;
}


export interface Provider {
  name: string;
  providerId: string;
  telephone: string;
  email: string;
  address: string;
}

export interface Client {
  name: string;
  clientId: string;
  telephone: string;
  email: string;
  address: string;
}

export interface User{
  userId: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;           //{"ADMIN","PROVIDER","USER"}
}

