import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Card, Button } from './components/ui/LayoutPrimitives';
import { AIInsightWidget } from './components/dashboard/AIInsightWidget';
import { TransactionTable } from './components/transactions/TransactionTable';
import { CashFlowChart } from './components/dashboard/OverviewCharts';
import { 
  MOCK_USER, 
  MOCK_COMPANY, 
  MOCK_TRANSACTIONS, 
  MOCK_ACCOUNTS 
} from './constants';
import { UserRole } from './types';
import { Bell, Search, Menu, Building } from 'lucide-react';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (activeRoute) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_ACCOUNTS.map(acc => (
                <Card key={acc.id} className="p-6">
                  <p className="text-sm font-medium text-slate-500 mb-1">{acc.name}</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {acc.balance.toLocaleString('en-US', { style: 'currency', currency: acc.currency })}
                  </h3>
                  <div className="mt-2 text-xs text-slate-400 uppercase tracking-wide">{acc.type}</div>
                </Card>
              ))}
            </div>

            {/* AI Widget & Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CashFlowChart />
              </div>
              <div className="lg:col-span-1">
                <AIInsightWidget 
                  transactions={MOCK_TRANSACTIONS} 
                  companyName={MOCK_COMPANY.name} 
                />
              </div>
            </div>

            {/* Recent Transactions */}
            <Card className="p-0 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                <Button variant="ghost" onClick={() => setActiveRoute('transactions')}>View All</Button>
              </div>
              <TransactionTable transactions={MOCK_TRANSACTIONS} />
            </Card>
          </div>
        );
      
      case 'transactions':
        return (
           <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions</h1>
               <div className="flex gap-2">
                 <Button variant="secondary">Filter</Button>
                 <Button variant="primary">New Transaction</Button>
               </div>
             </div>
             <Card className="p-0 overflow-hidden">
                <TransactionTable transactions={[...MOCK_TRANSACTIONS, ...MOCK_TRANSACTIONS]} />
             </Card>
           </div>
        );

      case 'reports':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Building className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Financial Reports Module</h2>
              <p className="text-slate-500 max-w-md mt-2">
                This module would generate PDFs (Balance Sheet, P&L) using server-side rendering in the full Next.js implementation.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-slate-500">Module <strong>{activeRoute}</strong> is under construction in this architectural preview.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        currentUser={MOCK_USER}
        currentCompany={MOCK_COMPANY}
        userRole={UserRole.ADMIN}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeRoute={activeRoute}
        onNavigate={(route) => {
          setActiveRoute(route);
          setSidebarOpen(false); // Close on mobile navigate
        }}
      />

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen flex flex-col transition-all">
        
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden text-slate-500 hover:text-slate-700">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search transactions, accounts..." 
                className="pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-64 outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
               <img src={MOCK_USER.avatarUrl} alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
