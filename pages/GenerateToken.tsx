
import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';
import { Service, Token } from '../types';
import { Ticket, User, Phone, CheckCircle, ArrowLeft, Smartphone, Printer, ExternalLink, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GenerateTokenProps {
  isPublic?: boolean;
}

const GenerateToken: React.FC<GenerateTokenProps> = ({ isPublic = false }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState<number | ''>('');
  const [generatedToken, setGeneratedToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    mockApi.getServices().then(setServices);
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceId) return;
    
    setLoading(true);
    try {
      const token = await mockApi.generateToken({
        serviceId: Number(selectedServiceId),
        name,
        phone
      });
      setGeneratedToken(token);
      setName('');
      setPhone('');
      setSelectedServiceId('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${isPublic ? 'min-h-screen bg-soft-gray p-6 pt-24' : 'max-w-6xl mx-auto space-y-10'}`}>
      {isPublic && (
        <div className="absolute top-8 left-8 flex items-center space-x-6">
           <Link to="/login" className="p-3 bg-white rounded-2xl shadow-lg text-gray-400 hover:text-matt-black transition-all hover:scale-110">
             <ArrowLeft size={24} />
           </Link>
           <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-matt-black text-light-orange rounded-xl flex items-center justify-center font-black text-xl shadow-xl">Q</div>
            <span className="font-black text-2xl text-matt-black tracking-tighter">Q-Master Mobile</span>
           </div>
        </div>
      )}

      {!generatedToken && (
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-black text-matt-black tracking-tight">Issue New Token</h1>
          <p className="text-gray-500 font-bold text-xl uppercase tracking-widest opacity-60">Registration Desk</p>
        </div>
      )}

      <div className={`flex flex-col ${generatedToken ? 'items-center' : 'lg:flex-row'} gap-12 justify-center max-w-7xl mx-auto`}>
        {!generatedToken ? (
          <form onSubmit={handleGenerate} className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 space-y-8 flex-1 max-w-2xl">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-1">Visitor Identity</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-light-orange" size={24} />
                  <input
                    type="text" required
                    className="w-full pl-16 pr-6 py-6 bg-soft-gray rounded-[2rem] border-none focus:ring-4 focus:ring-light-orange/20 transition-all text-matt-black font-black text-lg placeholder:font-bold placeholder:opacity-30"
                    placeholder="ENTER FULL NAME"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-1">Contact Details</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-light-orange" size={24} />
                  <input
                    type="tel" required
                    className="w-full pl-16 pr-6 py-6 bg-soft-gray rounded-[2rem] border-none focus:ring-4 focus:ring-light-orange/20 transition-all text-matt-black font-black text-lg placeholder:font-bold placeholder:opacity-30"
                    placeholder="PHONE NUMBER"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-1">Department / Service</label>
                <div className="relative">
                  <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-light-orange" size={24} />
                  <select
                    required
                    className="w-full pl-16 pr-12 py-6 bg-soft-gray rounded-[2rem] border-none focus:ring-4 focus:ring-light-orange/20 transition-all appearance-none text-matt-black font-black text-lg cursor-pointer"
                    value={selectedServiceId}
                    onChange={e => setSelectedServiceId(e.target.value ? parseInt(e.target.value) : '')}
                  >
                    <option value="" className="font-bold">SELECT DEPARTMENT</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id} className="font-bold">{s.serviceName.toUpperCase()}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-gray-400">
                    <ChevronDown size={24} />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-matt-black text-white font-black py-7 rounded-[2rem] flex items-center justify-center space-x-4 hover:bg-black hover:shadow-2xl transition-all active:scale-[0.98] disabled:opacity-50 text-2xl uppercase tracking-[0.2em]"
            >
              <Ticket size={32} className="text-light-orange" />
              <span>{loading ? 'PROCESSING...' : 'ISSUE TICKET'}</span>
            </button>
          </form>
        ) : (
          <div className="bg-white w-full max-w-4xl p-16 rounded-[4rem] shadow-2xl border-8 border-light-orange relative overflow-hidden text-center transform animate-in zoom-in slide-in-from-bottom-10 duration-700">
             {/* Large background decorative number */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                <p className="text-[30rem] font-black leading-none">{generatedToken.tokenNumber}</p>
             </div>

             <div className="relative z-10">
               <div className="flex justify-center mb-10">
                 <div className="bg-green-100 text-green-600 p-6 rounded-[2.5rem] shadow-inner">
                    <CheckCircle size={64} />
                 </div>
               </div>
               
               <p className="text-gray-400 font-black uppercase tracking-[0.5em] text-lg mb-6">OFFICIAL SERVICE TOKEN</p>
               <h2 className="text-9xl font-black text-matt-black mb-10 leading-none tracking-tighter drop-shadow-md">{generatedToken.tokenNumber}</h2>
               
               <div className="bg-soft-gray p-10 rounded-[3rem] grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
                  <div>
                    <span className="text-gray-400 text-xs font-black uppercase tracking-widest block mb-1">Visitor</span>
                    <span className="font-black text-matt-black text-2xl">{generatedToken.customerName}</span>
                  </div>
                  <div className="md:border-l md:border-gray-200 md:pl-8">
                    <span className="text-gray-400 text-xs font-black uppercase tracking-widest block mb-1">Check-in</span>
                    <span className="font-black text-matt-black text-2xl">{new Date(generatedToken.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                  </div>
                  <div className="md:border-l md:border-gray-200 md:pl-8">
                    <span className="text-gray-400 text-xs font-black uppercase tracking-widest block mb-1">Wait Time</span>
                    <span className="font-black text-orange-600 text-2xl">~15 MINS</span>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                 <button 
                  onClick={() => window.print()} 
                  className="py-6 bg-matt-black text-white rounded-[2rem] font-black text-xl transition-all hover:bg-black hover:shadow-xl flex items-center justify-center space-x-3 active:scale-95"
                 >
                   <Printer size={24} />
                   <span>PRINT TICKET</span>
                 </button>
                 <Link to="/display" className="py-6 bg-light-orange text-matt-black rounded-[2rem] font-black text-xl transition-all hover:bg-orange-400 hover:shadow-xl flex items-center justify-center space-x-3 active:scale-95">
                   <ExternalLink size={24} />
                   <span>TRACK LIVE</span>
                 </Link>
               </div>
               
               <div className="mt-12 flex flex-col items-center space-y-4">
                  <button onClick={() => setGeneratedToken(null)} className="text-gray-400 font-black uppercase tracking-widest hover:text-matt-black transition-colors">
                    Issue Another Token
                  </button>
                  <p className="text-xs text-gray-400 font-bold max-w-sm">Please present this digital or printed ticket at your assigned counter when called.</p>
               </div>
             </div>
          </div>
        )}

        {!generatedToken && (
          <div className="bg-white/50 border-4 border-dashed border-gray-100 p-16 rounded-[3rem] flex-1 max-w-md flex flex-col items-center justify-center text-gray-300 text-center hidden xl:flex">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner mb-8">
              <Ticket size={64} className="opacity-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-400">READY FOR ISSUE</h3>
            <p className="max-w-xs mt-4 text-gray-400 font-medium leading-relaxed">Fill out the visitor details on the left. A unique sequence number will be generated automatically for the selected department.</p>
          </div>
        )}
      </div>
      
      {isPublic && (
        <div className="text-center mt-16 text-gray-400 text-sm font-black uppercase tracking-widest">
          Q-Master Pro &bull; &copy; 2025 Healthcare Excellence System
        </div>
      )}
    </div>
  );
};

export default GenerateToken;
