
import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';
import { User, Token, Counter, TokenStatus } from '../types';
import { Play, CheckCircle, XCircle, Users } from 'lucide-react';

interface StaffPanelProps {
  user: User;
}

const StaffPanel: React.FC<StaffPanelProps> = ({ user }) => {
  const [activeCounter, setActiveCounter] = useState<Counter | null>(null);
  const [currentToken, setCurrentToken] = useState<Token | null>(null);
  const [waitingCount, setWaitingCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const [c, t] = await Promise.all([mockApi.getCounters(), mockApi.getActiveTokens()]);
    
    // In a real app, we'd link staff to counter via user profile
    // Here we'll just pick a counter they can operate (Counter 1 for demo)
    const myCounter = c[0]; 
    setActiveCounter(myCounter);
    
    const serving = t.find(token => token.counterId === myCounter.id && token.status === TokenStatus.CALLED);
    setCurrentToken(serving || null);
    
    const waiting = t.filter(token => token.serviceId === myCounter.serviceId && token.status === TokenStatus.WAITING).length;
    setWaitingCount(waiting);
  };

  useEffect(() => {
    loadData();
    const int = setInterval(loadData, 10000);
    return () => clearInterval(int);
  }, []);

  const handleCallNext = async () => {
    if (!activeCounter) return;
    setLoading(true);
    try {
      const next = await mockApi.callNextToken(activeCounter.id);
      setCurrentToken(next);
      loadData();
    } catch (err: any) {
      alert(err || "No more tokens");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!currentToken) return;
    await mockApi.completeToken(currentToken.id);
    setCurrentToken(null);
    loadData();
  };

  const handleCancel = async () => {
    if (!currentToken) return;
    await mockApi.cancelToken(currentToken.id);
    setCurrentToken(null);
    loadData();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-matt-black">Staff Control Panel</h1>
          <p className="text-gray-500">Managing {activeCounter?.counterName} - {activeCounter ? 'Online' : 'Offline'}</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
           <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Users size={20}/></div>
           <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Queue Size</p>
              <p className="text-xl font-black text-matt-black">{waitingCount} Waiting</p>
           </div>
        </div>
      </div>

      {currentToken ? (
        <div className="bg-white rounded-[2.5rem] p-12 shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-8 transform animate-in zoom-in duration-300">
           <div className="space-y-2">
             <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Now Serving</span>
             <h2 className="text-8xl font-black text-matt-black">{currentToken.tokenNumber}</h2>
           </div>
           
           <div className="w-full max-w-sm grid grid-cols-2 gap-4">
              <div className="text-left bg-soft-gray p-4 rounded-2xl">
                 <p className="text-xs text-gray-400 font-bold uppercase">Customer</p>
                 <p className="font-bold truncate">{currentToken.customerName}</p>
              </div>
              <div className="text-left bg-soft-gray p-4 rounded-2xl">
                 <p className="text-xs text-gray-400 font-bold uppercase">Waiting Since</p>
                 <p className="font-bold">{new Date(currentToken.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 w-full max-w-md pt-4">
              <button 
                onClick={handleComplete}
                className="bg-green-500 text-white font-bold py-5 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-green-600 transition-all hover:shadow-lg active:scale-95"
              >
                <CheckCircle size={32} />
                <span>Mark Completed</span>
              </button>
              <button 
                onClick={handleCancel}
                className="bg-red-500 text-white font-bold py-5 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-red-600 transition-all hover:shadow-lg active:scale-95"
              >
                <XCircle size={32} />
                <span>Cancel / No Show</span>
              </button>
           </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] p-20 shadow-sm border-2 border-dashed border-gray-200 flex flex-col items-center text-center space-y-6">
           <div className="w-24 h-24 bg-soft-gray rounded-full flex items-center justify-center text-gray-300">
              <Play size={48} />
           </div>
           <div>
              <h2 className="text-2xl font-bold text-gray-400">Ready for next customer?</h2>
              <p className="text-gray-400 mt-2">Click below to call the next token from the waiting list</p>
           </div>
           <button 
             onClick={handleCallNext}
             disabled={loading || waitingCount === 0}
             className="bg-matt-black text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 flex items-center space-x-3"
           >
             <Play size={24} fill="currentColor" />
             <span>CALL NEXT TOKEN</span>
           </button>
        </div>
      )}
    </div>
  );
};

export default StaffPanel;
