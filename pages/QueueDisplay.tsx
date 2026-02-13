
import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';
import { Token, Counter, TokenStatus } from '../types';

const QueueDisplay: React.FC = () => {
  const [activeTokens, setActiveTokens] = useState<Token[]>([]);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [now, setNow] = useState(new Date());

  const fetchData = async () => {
    const [t, c] = await Promise.all([mockApi.getActiveTokens(), mockApi.getCounters()]);
    setActiveTokens(t);
    setCounters(c);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
      setNow(new Date());
    }, 5000); // 5 seconds auto-refresh
    return () => clearInterval(interval);
  }, []);

  const currentlyServing = activeTokens.filter(t => t.status === TokenStatus.CALLED);
  const waitingList = activeTokens.filter(t => t.status === TokenStatus.WAITING).slice(0, 10);

  return (
    <div className="min-h-screen bg-matt-black text-white p-0 flex flex-col overflow-hidden">
      {/* Top Banner */}
      <header className="bg-light-orange text-matt-black py-6 px-12 flex justify-between items-center shadow-lg">
        <div>
           <h1 className="text-4xl font-black">LIVE QUEUE BOARD</h1>
           <p className="font-bold opacity-70">Please wait for your token to be called</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black">{now.toLocaleTimeString()}</p>
          <p className="font-bold opacity-70">{now.toLocaleDateString()}</p>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Now Serving */}
        <div className="w-2/3 p-12 overflow-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
             <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
             <span>NOW SERVING</span>
          </h2>
          <div className="grid grid-cols-1 gap-8">
             {currentlyServing.length > 0 ? currentlyServing.map(token => (
               <div key={token.id} className="bg-white/5 border-2 border-light-orange/30 p-10 rounded-[3rem] flex justify-between items-center animate-in slide-in-from-left duration-500">
                  <div className="flex flex-col">
                     <span className="text-orange-400 font-bold uppercase tracking-widest text-xl mb-2">Token Number</span>
                     <span className="text-9xl font-black text-white">{token.tokenNumber}</span>
                  </div>
                  <div className="bg-light-orange text-matt-black p-12 rounded-[2rem] text-center min-w-[300px]">
                     <span className="font-bold text-2xl uppercase opacity-60">Go To</span>
                     <h3 className="text-7xl font-black">{counters.find(c => c.id === token.counterId)?.counterName || 'Counter'}</h3>
                  </div>
               </div>
             )) : (
               <div className="p-20 text-center text-gray-500 italic text-2xl">
                 No active service at the moment
               </div>
             )}
          </div>
        </div>

        {/* Right Side: Waiting List */}
        <div className="w-1/3 bg-white/5 border-l border-white/10 p-12 flex flex-col">
          <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3 text-gray-400">
             <span>WAITING LIST</span>
          </h2>
          <div className="space-y-4 flex-1 overflow-auto">
             {waitingList.map(token => (
               <div key={token.id} className="flex justify-between items-center p-6 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-3xl font-bold">{token.tokenNumber}</span>
                  <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full font-bold text-sm">WAITING</span>
               </div>
             ))}
             {waitingList.length === 0 && (
               <p className="text-gray-500 italic text-center py-10">Waiting list is empty</p>
             )}
          </div>
          
          <div className="mt-8 bg-light-orange/10 p-6 rounded-2xl border border-light-orange/20">
             <p className="text-light-orange font-bold text-center">Need Help?</p>
             <p className="text-gray-400 text-sm text-center">Visit reception for any queries or to register</p>
          </div>
        </div>
      </div>

      {/* Footer Scrolling News */}
      <div className="bg-white/5 py-4 px-12 border-t border-white/10 flex items-center">
         <span className="bg-light-orange text-matt-black font-black px-4 py-1 rounded text-sm mr-6">NOTICE</span>
         <div className="flex-1 overflow-hidden">
            <p className="whitespace-nowrap animate-marquee font-medium">
               Welcome to Q-Master Healthcare. Please maintain silence. Your cooperation helps us serve you better. &nbsp; • &nbsp; Masks are recommended inside clinical areas. &nbsp; • &nbsp; Emergency tokens are prioritized automatically.
            </p>
         </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default QueueDisplay;
