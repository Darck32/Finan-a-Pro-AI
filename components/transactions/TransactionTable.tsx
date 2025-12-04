import React from 'react';
import { Transaction, TransactionType } from '../../types';
import { Badge } from '../ui/LayoutPrimitives';
import { MoreHorizontal, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface Props {
  transactions: Transaction[];
}

export const TransactionTable: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-300">
          <tr>
            <th scope="col" className="px-6 py-3">Transaction</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Type</th>
            <th scope="col" className="px-6 py-3 text-right">Amount</th>
            <th scope="col" className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="bg-white border-b dark:bg-slate-900 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-full ${tx.type === TransactionType.INCOME ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {tx.type === TransactionType.INCOME ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                   </div>
                   <div>
                     <div className="font-semibold">{tx.description}</div>
                     <div className="text-xs text-slate-500">ID: {tx.id.slice(0, 6)}</div>
                   </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {new Date(tx.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <Badge variant={tx.status === 'COMPLETED' ? 'success' : 'warning'}>
                  {tx.status}
                </Badge>
              </td>
              <td className="px-6 py-4 capitalize">
                {tx.type.toLowerCase()}
              </td>
              <td className={`px-6 py-4 text-right font-mono font-medium ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </td>
              <td className="px-6 py-4 text-center">
                 <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                    <MoreHorizontal className="w-5 h-5" />
                 </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
