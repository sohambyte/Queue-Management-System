
import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';
import { User, Token, Counter, TokenStatus } from '../types';
import { Play, CheckCircle, XCircle, Users, BellRing, UserCheck, ChevronDown } from 'lucide-react';

interface StaffPanelProps {
  user: User;
}

const StaffPanel: React.FC<StaffPanelProps> = ({ user }) => {
  const [activeCounter, setActiveCounter] = useState<Counter | null>(null);
  const [allCounters, setAllCounters] = useState<Counter[]>([]);
  const [currentToken, setCurrentToken] = useState<Token | null>(null);
  const [waitingTokens, setWaitingTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  // Initial load of counters
  useEffect(() => {
    const initCounters = async () => {
      const counters = await mockApi.getCounters();
      setAllCounters(counters);
      
      // Default selection logic if none selected yet
      if (!activeCounter) {
        let defaultCounter = counters[0];
        if (user.role === 'STAFF') {
            defaultCounter = user.id === 2 ? counters[0] : counters[1]; 
        } else if (user.role === 'RECEPTION') {
            defaultCounter = counters[2];
        }
        setActiveCounter(defaultCounter);
      }
    };
    initCounters();
  }, [user]);

  const loadQueueData = async () => {
    if (!activeCounter) return;
    
    const t = await mockApi.getActiveTokens();
    
    // Find if current counter is serving someone
    const serving = t.find(token => token.counterId === activeCounter.id && token.status === TokenStatus.CALLED);
    setCurrentToken(serving || null);
    
    // Get waiting list for this counter's service
    const waiting = t.filter(token => token.serviceId === activeCounter.serviceId && token.status === TokenStatus.WAITING);
    setWaitingTokens(waiting);
  };

  // Poll for queue updates
  useEffect(() => {
    loadQueueData();
    const int = setInterval(loadQueueData, 5000);
    return () => clearInterval(int);
  }, [activeCounter]);

  const handleCounterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const counterId = parseInt(e.target.value);
    const selected = allCounters.find(c => c.id === counterId);
    if (selected) {
      setActiveCounter(selected);
      setCurrentToken(null); // Reset local state when switching counters
    }
  };

  const handleCallNext = async () => {
    if (!activeCounter) return;
    setLoading(true);
    try {
      const next = await mockApi.callNextToken(activeCounter.id);
      setCurrentToken(next);
      loadQueueData();
    } catch (err: any) {
      alert(err || "No more tokens");
    } finally {
      setLoading(false);
    }
  };

  const handleCallSpecific = async (tokenId: number) => {
    if (!activeCounter) return;
    if (currentToken) {
        alert("Please complete or cancel the current visitor before calling a new one.");
        return;
    }
    setLoading(true);
    try {
      const token = await mockApi.callSpecificToken(tokenId, activeCounter.id);
      setCurrentToken(token);
      loadQueueData();
    } catch (err: any) {
      alert(err || "Error calling token");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!currentToken) return;
    await mockApi.completeToken(currentToken.id);
    setCurrentToken(null);
    loadQueueData();
  };

  const handleCancel = async () => {
    if (!currentToken) return;
    await mockApi.cancelToken(currentToken.id);
    setCurrentToken(null);
    loadQueueData();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-matt-black">Staff Workspace</h1>
          <div className="mt-2 flex items-center space-x-3">
            <span className="text-gray-500 font-medium">Operating Station:</span>
            <div className="relative inline-block">
              <select 
                value={activeCounter?.id || ''} 
                onChange={handleCounterChange}
                className="appearance-none bg-white border border-gray-200 px-4 py-2 pr-10 rounded-xl font-bold text-matt-black focus:ring-2 focus:ring-light-orange outline-none transition-all cursor-pointer shadow-sm hover:border-light-orange"
              >
                {allCounters.map(c => (
                  <option key={c.id} value={c.id}>{c.counterName}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
           <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Users size={20}/></div>
           <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Department Queue</p>
              <p className="text-xl font-black text-matt-black">{waitingTokens.length} Waiting</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Action Area */}
        <div className="lg:col-span-2 space-y-6">
          {currentToken ? (
            <div className="bg-white rounded-[2.5rem] p-12 shadow-xl border-4 border-light-orange flex flex-col items-center text-center space-y-8 transform animate-in zoom-in duration-300">
               <div className="space-y-2">
                 <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">Now Serving</span>
                 <h2 className="text-9xl font-black text-matt-black leading-none">{currentToken.tokenNumber}</h2>
               </div>
               
               <div className="w-full max-w-sm grid grid-cols-2 gap-4">
                  <div className="text-left bg-soft-gray p-5 rounded-2xl border border-gray-100">
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">Visitor Name</p>
                     <p className="font-black text-matt-black truncate text-lg">{currentToken.customerName}</p>
                  </div>
                  <div className="text-left bg-soft-gray p-5 rounded-2xl border border-gray-100">
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">Waiting Since</p>
                     <p className="font-black text-matt-black text-lg">{new Date(currentToken.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 w-full max-w-md pt-4">
                  <button 
                    onClick={handleComplete}
                    className="bg-green-500 text-white font-black py-6 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-green-600 transition-all hover:shadow-2xl active:scale-95 text-lg"
                  >
                    <CheckCircle size={36} />
                    <span>COMPLETE VISIT</span>
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="bg-red-500 text-white font-black py-6 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-red-600 transition-all hover:shadow-2xl active:scale-95 text-lg"
                  >
                    <XCircle size={36} />
                    <span>NO SHOW / CANCEL</span>
                  </button>
               </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-24 shadow-sm border-4 border-dashed border-gray-100 flex flex-col items-center text-center space-y-8">
               <div className="w-24 h-24 bg-soft-gray rounded-3xl flex items-center justify-center text-gray-200">
                  <Play size={48} fill="currentColor" />
               </div>
               <div>
                  <h2 className="text-3xl font-black text-gray-300">Station Idle</h2>
                  <p className="text-gray-400 mt-2 max-w-xs mx-auto">Call the next person from the list or pick a specific token to begin service at {activeCounter?.counterName}.</p>
               </div>
               <button 
                 onClick={handleCallNext}
                 disabled={loading || waitingTokens.length === 0}
                 className="bg-matt-black text-white px-12 py-6 rounded-2xl font-black text-2xl hover:bg-black transition-all shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed transform active:scale-95 flex items-center space-x-4 uppercase tracking-widest"
               >
                 <BellRing size={28} className="text-light-orange" />
                 <span>Call Next</span>
               </button>
            </div>
          )}
        </div>

        {/* Sidebar: Waiting Queue */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-soft-gray flex justify-between items-center">
                <h3 className="font-black text-matt-black uppercase tracking-wider text-sm">Waiting Queue</h3>
                <span className="bg-matt-black text-white text-[10px] font-black px-2 py-1 rounded-full">{waitingTokens.length}</span>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-3 max-h-[600px]">
                {waitingTokens.map(token => (
                    <div key={token.id} className="group p-5 bg-white border border-gray-100 rounded-3xl hover:border-light-orange hover:shadow-md transition-all flex justify-between items-center">
                        <div>
                            <p className="text-2xl font-black text-matt-black leading-tight">{token.tokenNumber}</p>
                            <p className="text-xs font-bold text-gray-400 truncate max-w-[120px]">{token.customerName}</p>
                        </div>
                        <button 
                            onClick={() => handleCallSpecific(token.id)}
                            disabled={loading || !!currentToken}
                            className="bg-soft-gray text-matt-black p-3 rounded-2xl group-hover:bg-light-orange transition-all disabled:opacity-20 flex items-center space-x-2"
                            title="Call this token specifically"
                        >
                            <UserCheck size={20} />
                            <span className="font-black text-xs uppercase">Call</span>
                        </button>
                    </div>
                ))}
                {waitingTokens.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-300 opacity-50">
                        <Users size={48} className="mb-4" />
                        <p className="font-bold text-sm italic">Queue is empty</p>
                    </div>
                )}
            </div>
            <div className="p-6 bg-orange-50 text-[10px] text-orange-800 font-bold uppercase tracking-tight text-center">
                Real-time updates enabled
            </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPanel;
