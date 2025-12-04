import { 
  User, 
  Company, 
  UserRole, 
  SubscriptionPlan, 
  FinancialAccount, 
  AccountType,
  Transaction,
  TransactionType
} from './types';

// --- MOCK DATABASE ---

export const MOCK_USER: User = {
  id: 'u_123',
  email: 'cto@techfin.com',
  fullName: 'Alice Architect',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  avatarUrl: 'https://picsum.photos/200'
};

export const MOCK_COMPANY: Company = {
  id: 'c_999',
  name: 'Global Tech Solutions Inc.',
  plan: SubscriptionPlan.PRO,
  createdAt: '2023-01-01T00:00:00Z',
  ownerId: 'u_123',
  logoUrl: 'https://picsum.photos/100'
};

export const MOCK_ACCOUNTS: FinancialAccount[] = [
  { id: 'acc_1', companyId: 'c_999', name: 'Main Operations', type: AccountType.CHECKING, currency: 'USD', balance: 145000.50, isActive: true },
  { id: 'acc_2', companyId: 'c_999', name: 'Tax Reserve', type: AccountType.SAVINGS, currency: 'USD', balance: 52000.00, isActive: true },
  { id: 'acc_3', companyId: 'c_999', name: 'Corporate Amex', type: AccountType.CREDIT_CARD, currency: 'USD', balance: -3200.45, isActive: true },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { 
    id: 'tx_1', companyId: 'c_999', accountId: 'acc_1', categoryId: 'cat_1', 
    amount: 15000, type: TransactionType.INCOME, date: '2023-10-25', 
    description: 'Client Payment - Project Alpha', status: 'COMPLETED' 
  },
  { 
    id: 'tx_2', companyId: 'c_999', accountId: 'acc_1', categoryId: 'cat_2', 
    amount: -4500, type: TransactionType.EXPENSE, date: '2023-10-26', 
    description: 'AWS Infrastructure Bill', status: 'COMPLETED' 
  },
  { 
    id: 'tx_3', companyId: 'c_999', accountId: 'acc_3', categoryId: 'cat_3', 
    amount: -120, type: TransactionType.EXPENSE, date: '2023-10-27', 
    description: 'Team Lunch', status: 'PENDING' 
  },
  { 
    id: 'tx_4', companyId: 'c_999', accountId: 'acc_1', categoryId: 'cat_2', 
    amount: -2100, type: TransactionType.EXPENSE, date: '2023-10-28', 
    description: 'Software Licenses (Adobe, JetBrains)', status: 'COMPLETED' 
  },
  { 
    id: 'tx_5', companyId: 'c_999', accountId: 'acc_1', categoryId: 'cat_1', 
    amount: 8500, type: TransactionType.INCOME, date: '2023-10-29', 
    description: 'Consulting Retainer', status: 'COMPLETED' 
  },
];

export const MOCK_PERMISSIONS = {
  [UserRole.SUPER_ADMIN]: ['*'],
  [UserRole.ADMIN]: ['read:*', 'write:*', 'delete:*'],
  [UserRole.FINANCIAL_MANAGER]: ['read:reports', 'write:transactions', 'approve:payments'],
  [UserRole.BASIC_USER]: ['read:own_data', 'write:requests']
};
