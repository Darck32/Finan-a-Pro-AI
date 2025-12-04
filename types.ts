/**
 * DATA MODEL & ARCHITECTURE TYPES
 * 
 * This file represents the "Logical Database Model" requested.
 * It defines the shape of data as it would exist in the PostgreSQL/Prisma layer,
 * but adapted for Frontend Type Safety.
 */

// --- 1. ENUMS (Database Enums) ---

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  FINANCIAL_MANAGER = 'FINANCIAL_MANAGER',
  ACCOUNTANT = 'ACCOUNTANT',
  BASIC_USER = 'BASIC_USER',
  AUDITOR = 'AUDITOR'
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER'
}

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  CREDIT_CARD = 'CREDIT_CARD',
  INVESTMENT = 'INVESTMENT',
  CASH = 'CASH'
}

export enum SubscriptionPlan {
  FREE = 'FREE',
  STARTER = 'STARTER',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE'
}

// --- 2. ENTITIES (Database Tables) ---

// Table: users
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

// Table: companies (Tenants)
export interface Company {
  id: string;
  name: string;
  taxId?: string; // CNPJ/EIN
  logoUrl?: string;
  plan: SubscriptionPlan;
  createdAt: string;
  ownerId: string; // FK -> User
}

// Join Table: user_company_roles (Many-to-Many + Metadata)
export interface UserCompanyProfile {
  userId: string;
  companyId: string;
  role: UserRole;
  permissions: string[]; // JSONB in DB: ['read:reports', 'write:transactions']
}

// Table: accounts
export interface FinancialAccount {
  id: string;
  companyId: string; // FK -> Company
  name: string;
  type: AccountType;
  currency: string;
  balance: number;
  isActive: boolean;
}

// Table: categories
export interface Category {
  id: string;
  companyId: string; // FK -> Company
  name: string;
  type: TransactionType;
  color?: string;
  parentId?: string; // Self-reference for nested categories
}

// Table: cost_centers
export interface CostCenter {
  id: string;
  companyId: string;
  name: string;
  code: string;
  budgetCap?: number;
}

// Table: transactions
export interface Transaction {
  id: string;
  companyId: string; // FK
  accountId: string; // FK -> FinancialAccount
  categoryId?: string; // FK -> Category
  costCenterId?: string; // FK -> CostCenter
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  attachments?: string[]; // Array of URLs
  aiTags?: string[]; // Auto-generated tags by Gemini
}

// Table: audit_logs
export interface AuditLog {
  id: string;
  userId: string;
  companyId: string;
  action: string;
  entity: string; // 'TRANSACTION', 'USER', etc.
  entityId: string;
  timestamp: string;
  ipAddress: string;
  metadata?: any; // JSON
}

// Table: ai_insights
export interface AIInsight {
  id: string;
  companyId: string;
  title: string;
  content: string; // Generated text
  severity: 'info' | 'warning' | 'critical';
  createdAt: string;
  actionable: boolean;
}

// --- 3. COMPONENT PROPS ---

export interface SidebarProps {
  currentUser: User;
  currentCompany: Company;
  userRole: UserRole;
  isOpen: boolean;
  toggleSidebar: () => void;
  activeRoute: string;
  onNavigate: (route: string) => void;
}

export interface HeaderProps {
  user: User;
  company: Company;
  toggleSidebar: () => void;
}
