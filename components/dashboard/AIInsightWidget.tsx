import React, { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { generateFinancialHealthReport } from '../../services/geminiService';
import { Card, Button } from '../ui/LayoutPrimitives';
import { Transaction, AIInsight } from '../../types';

interface Props {
  transactions: Transaction[];
  companyName: string;
}

export const AIInsightWidget: React.FC<Props> = ({ transactions, companyName }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    setLoading(true);
    const result = await generateFinancialHealthReport(transactions, companyName);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    // Initial fetch on mount
    fetchInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-indigo-100 dark:border-indigo-900/30">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-24 h-24 text-indigo-500" />
      </div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-5 h-5" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gemini Financial Architect</h3>
                <p className="text-xs text-slate-500">AI-Powered Anomaly Detection & Planning</p>
            </div>
        </div>
        <Button variant="ghost" onClick={fetchInsight} disabled={loading} className="h-8 w-8 p-0">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="relative z-10 min-h-[120px]">
        {loading ? (
           <div className="space-y-3 animate-pulse">
             <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
             <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
             <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
           </div>
        ) : insight ? (
          <div className="space-y-3">
             <div className="flex items-center gap-2">
                {insight.severity === 'critical' && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                {insight.severity === 'warning' && <Info className="w-4 h-4 text-amber-500" />}
                {insight.severity === 'info' && <CheckCircle className="w-4 h-4 text-blue-500" />}
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">{insight.title}</h4>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
               {insight.content}
             </p>
             {insight.actionable && (
               <div className="mt-4">
                 <Button variant="secondary" className="text-xs h-8">View Recommendations</Button>
               </div>
             )}
          </div>
        ) : (
          <div className="text-center text-slate-500 text-sm py-4">
            Click refresh to analyze recent transactions.
          </div>
        )}
      </div>
    </Card>
  );
};
