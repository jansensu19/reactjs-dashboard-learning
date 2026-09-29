// 1. User & Authentication Types
export type UserRole = "Admin" | "Editor" | "Analyst";

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

// 2. Product & Inventory Types
export type ProductCategory = "Electronics" | "Furniture" | "Accessories";
export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: ProductStatus;
}

// 3. Order & Transaction Types
export type OrderStatus = "Completed" | "Pending" | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: OrderStatus;
}

// 4. Metrics & Chart Types
export interface DashboardStat {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  profit: number;
}

// 5. API Response Contracts
export interface DashboardDataResponse {
  stats: DashboardStat[];
  orders: Order[];
}

export interface ProductsDataResponse {
  products: Product[];
}

export interface TicketsDataResponse {
  tickets: Ticket[];
}

export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";

export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export type TicketCategory = "Billing" | "Technical" | "General" | "Feature Request";

export interface Ticket{
  id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: TicketCategory;
  assignee?: string;
  createdAt: string;
}

export interface TicketsDataResponse { 
  tickets: Ticket[]; 
}