
export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  RECEPTION = 'RECEPTION'
}

export enum TokenStatus {
  WAITING = 'WAITING',
  CALLED = 'CALLED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Service {
  id: number;
  serviceName: string;
  description: string;
  averageTimeMinutes: number;
  status: boolean;
}

export interface Counter {
  id: number;
  counterName: string;
  serviceId: number;
  status: boolean;
}

export interface Token {
  id: number;
  tokenNumber: string;
  serviceId: number;
  customerName: string;
  phone: string;
  status: TokenStatus;
  createdAt: string;
  calledAt?: string;
  completedAt?: string;
  counterId?: number;
}

export interface QueueDisplayItem {
  tokenNumber: string;
  counterName: string;
  status: TokenStatus;
}
