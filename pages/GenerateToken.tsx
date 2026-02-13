
import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';
import { Service, Token } from '../types';
import { Ticket, User, Phone, CheckCircle, ArrowLeft, Smartphone } from 'lucide-react';
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
      // In a real system, the backend would handle the concurrency and unique sequence.
      // mockApi is designed to simulate this atomic transaction.
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
    <div className={`${isPublic ? 'min-h-screen bg-soft-gray p-6 pt-20' : 'max-w-4xl mx-auto space-y-8'}`}>
      {isPublic && (
        <div className="absolute top-6 left-6 flex items-center space-x-4">
           <Link to="/login" className="p-2 bg-white rounded-xl shadow-sm text-gray-400 hover:text-matt-black transition-colors">
             <ArrowLeft size={20} />
           </Link>
           <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-matt-black text-light-orange rounded flex items-center justify-center font-bold">Q</div>
            <span className="font-bold text-matt-black">Q-Master Remote</span>
           </div>
        </div>
      )}

      <div className="text-center space-y-2 mb-10">
        <h1 className="text-4xl font-black text-matt-black">Electronic Ticket</h1>
        <p className="text-gray-500 font-medium">Request your queue position instantly</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
        <form onSubmit={handleGenerate} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-6 flex flex-col justify-center">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Your Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-light-orange" size={20} />
              <input
                type="text" required
                className="w-full pl-12 pr-4 py-4 bg-soft-gray rounded-2xl border-none focus:ring-2 focus:ring-light-orange transition-all text-matt-black font-semibold"
                placeholder="Johnathan Doe"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Contact Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-light-orange" size={20} />
              <input
                type="tel" required
                className="w-full pl-12 pr-4 py-4 bg-soft-gray rounded-2xl border-none focus:ring-2 focus:ring-light-orange transition-all text-matt-black font-semibold"
                placeholder="+1 234 567 890"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Service Required</label>
            <div className="relative">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-light-orange" size={20} />
              <select
                required
                className="w-full pl-12 pr-10 py-4 bg-soft-gray rounded-2xl border-none focus:ring-2 focus:ring-light-orange transition-all appearance-none text-matt-black font-semibold"
                value={selectedServiceId}
                onChange={e => setSelectedServiceId(e.target.value ? parseInt(e.target.value) : '')}
              >
                <option value="">Choose Department</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.serviceName}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-matt-black text-white font-black py-5 rounded-2xl flex items-center justify-center space-x-3 hover:bg-black hover:shadow-2xl transition-all active:scale-[0.98] disabled:opacity-50 text-lg uppercase tracking-widest"
          >
            <Ticket size={24} />
            <span>{loading ? 'Issuing Ticket...' : 'Get My Token'}</span>
          </button>
        </form>

        <div className="flex flex-col items-center justify-center h-full">
          {generatedToken ? (
            <div className="bg-white w-full p-10 rounded-[2.5rem] shadow-2xl border-4 border-light-orange relative overflow-hidden text-center transform animate-in zoom-in duration-500">
               <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12">
                 <Ticket size={180} />
               </div>
               <div className="flex justify-center mb-6">
                 <div className="bg-green-100 text-green-600 p-4 rounded-full">
                    <CheckCircle size={40} />
                 </div>
               </div>
               <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-sm mb-4">CONFIRMED TICKET</p>
               <h2 className="text-8xl font-black text-matt-black mb-8 leading-none">{generatedToken.tokenNumber}</h2>
               
               <div className="bg-soft-gray p-6 rounded-3xl space-y-4 mb-8 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs font-black uppercase tracking-wider">Visitor</span>
                    <span className="font-black text-matt-black">{generatedToken.customerName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs font-black uppercase tracking-wider">Issued</span>
                    <span className="font-black text-matt-black">{new Date(generatedToken.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs font-black uppercase tracking-wider">Est. Wait</span>
                    <span className="font-black text-orange-500">~15 Mins</span>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <button 
                  onClick={() => window.print()} 
                  className="py-4 bg-matt-black text-white rounded-2xl font-black transition-all hover:opacity-90"
                 >
                   Print
                 </button>
                 <Link to="/display" className="py-4 bg-light-orange text-matt-black rounded-2xl font-black transition-all hover:bg-orange-400">
                   Track Live
                 </Link>
               </div>
               <p className="mt-6 text-xs text-gray-400 font-medium">Please show this digital ticket at the counter when called.</p>
            </div>
          ) : (
            <div className="bg-white/50 border-4 border-dashed border-gray-100 w-full p-20 rounded-[2.5rem] flex flex-col items-center justify-center text-gray-300 text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
                <Ticket size={48} className="opacity-20" />
              </div>
              <h3 className="text-xl font-bold text-gray-400">Waiting for Registration</h3>
              <p className="max-w-xs mt-2 text-sm font-medium">Your uniquely generated token and QR code will appear here once you submit the form.</p>
            </div>
          )}
        </div>
      </div>
      
      {isPublic && (
        <div className="text-center mt-12 text-gray-400 text-sm font-medium">
          Powered by Q-Master Pro &bull; &copy; 2025 Healthcare Excellence
        </div>
      )}
    </div>
  );
};

export default GenerateToken;
