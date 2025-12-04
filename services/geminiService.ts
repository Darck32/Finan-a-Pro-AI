import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, AIInsight } from '../types';

// Initialize Gemini Client
// In a real production app, this call would likely go through a Next.js API route 
// to keep the API_KEY secret on the server.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateFinancialHealthReport = async (
  transactions: Transaction[],
  companyName: string
): Promise<AIInsight | null> => {
  
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key is missing. Returning mock insight.");
    return {
      id: 'mock_ai_1',
      companyId: 'c_999',
      title: 'Mock Analysis (No API Key)',
      content: 'Please configure the Gemini API Key to see real financial insights generated from your transaction data.',
      severity: 'info',
      createdAt: new Date().toISOString(),
      actionable: false
    };
  }

  try {
    const transactionSummary = transactions.map(t => 
      `${t.date}: ${t.description} (${t.amount} ${t.type})`
    ).join('\n');

    const prompt = `
      You are a senior financial analyst AI for a fintech SaaS.
      Analyze the following recent transactions for company "${companyName}".
      
      Transactions:
      ${transactionSummary}

      Identify 1 key financial trend, anomaly, or saving opportunity.
      Keep it professional, concise, and actionable.
    `;

    // Using Gemini 2.5 Flash for speed and efficiency in text analysis
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            severity: { type: Type.STRING, enum: ['info', 'warning', 'critical'] },
            actionable: { type: Type.BOOLEAN }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');

    return {
      id: `ai_${Date.now()}`,
      companyId: 'c_999', // context aware in real app
      title: result.title || 'Financial Insight',
      content: result.content || 'Analysis complete.',
      severity: result.severity || 'info',
      createdAt: new Date().toISOString(),
      actionable: result.actionable || false
    };

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return null;
  }
};

export const categorizeTransactionAI = async (description: string): Promise<string> => {
    if (!process.env.API_KEY) return "Uncategorized";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Categorize this financial transaction description into one word (e.g., Travel, Software, Salary, Tax, Meals): "${description}"`
        });
        return response.text?.trim() || "Uncategorized";
    } catch (e) {
        return "Uncategorized";
    }
}
