import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowRightLeft, 
  PieChart, 
  FileText, 
  Settings, 
  ShieldCheck, 
  BrainCircuit,
  Building2,
  Users
} from 'lucide-react';
import { SidebarProps } from '../../types';

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeRoute, onNavigate, currentCompany }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
    { id: 'accounts', label: 'Accounts', icon: Wallet },
    { id: 'budgets', label: 'Budgets & Planning', icon: PieChart },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'ai-insights', label: 'AI Insights', icon: BrainCircuit, highlight: true },
  ];

  const adminItems = [
    { id: 'team', label: 'Team & Roles', icon: Users },
    { id: 'settings', label: 'Company Settings', icon: Building2 },
    { id: 'security', label: 'Security & Audit', icon: ShieldCheck },
  ];

  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-slate-900 text-slate-300 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 border-r border-slate-800`}>
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="flex items-center pl-2.5 mb-8">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mr-3">
            F
          </div>
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            FinArchitect
          </span>
        </div>

        <div className="mb-6 px-3 py-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-xs font-medium text-slate-500 uppercase mb-1">Current Organization</p>
          <p className="text-sm font-semibold text-white truncate">{currentCompany.name}</p>
          <span className="text-[10px] bg-blue-900/50 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800 mt-1 inline-block">
            {currentCompany.plan}
          </span>
        </div>

        <ul className="space-y-1 font-medium">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`flex items-center w-full p-2 rounded-lg group transition-colors ${
                  activeRoute === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                } ${item.highlight ? 'text-indigo-400 hover:text-indigo-300' : ''}`}
              >
                <item.icon className={`w-5 h-5 transition duration-75 ${activeRoute === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                <span className="ml-3">{item.label}</span>
                {item.highlight && <span className="ml-auto text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">New</span>}
              </button>
            </li>
          ))}
        </ul>

        <div className="my-4 border-t border-slate-800"></div>
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Administration
        </p>

        <ul className="space-y-1 font-medium">
          {adminItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`flex items-center w-full p-2 rounded-lg group transition-colors ${
                  activeRoute === item.id 
                    ? 'bg-slate-800 text-white' 
                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 text-slate-500 transition duration-75 group-hover:text-white" />
                <span className="ml-3">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
