
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Link } from 'react-router-dom';
import { Smartphone, Monitor, Info } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock Authentication Logic
    if (email === 'admin@test.com' && password === 'admin') {
      onLogin({ id: 1, name: 'Super Admin', email, role: UserRole.ADMIN });
    } else if (email === 'staff@test.com' && password === 'staff') {
      onLogin({ id: 2, name: 'Medical Staff', email, role: UserRole.STAFF });
    } else if (email === 'recep@test.com' && password === 'recep') {
      onLogin({ id: 3, name: 'Receptionist', email, role: UserRole.RECEPTION });
    } else {
      setError('Invalid credentials. Use admin/admin, staff/staff, or recep/recep');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-soft-gray overflow-hidden">
      {/* Public Branding / Actions Side */}
      <div className="md:w-1/2 bg-matt-black p-12 flex flex-col justify-center text-white relative">
        <div className="absolute top-10 left-10 flex items-center space-x-3">
           <div className="w-10 h-10 bg-light-orange rounded-xl flex items-center justify-center text-matt-black font-black">Q</div>
           <span className="text-xl font-bold">Q-Master Pro</span>
        </div>
        
        <div className="max-w-md mx-auto space-y-8">
          <h2 className="text-5xl font-black leading-tight">Patient & Visitor Portal</h2>
          <p className="text-gray-400 text-lg">Skip the waiting line. Access our services remotely and stay updated with live queue status.</p>
          
          <div className="grid grid-cols-1 gap-4">
            <Link to="/get-token" className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-light-orange hover:text-matt-black transition-all group">
               <div className="flex items-center space-x-4">
                 <Smartphone className="text-light-orange group-hover:text-matt-black" />
                 <div>
                   <p className="font-bold">Get a Token</p>
                   <p className="text-xs opacity-60">Register from your mobile</p>
                 </div>
               </div>
               <span className="text-xl">→</span>
            </Link>

            <Link to="/display" className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-light-orange hover:text-matt-black transition-all group">
               <div className="flex items-center space-x-4">
                 <Monitor className="text-light-orange group-hover:text-matt-black" />
                 <div>
                   <p className="font-bold">Live Status</p>
                   <p className="text-xs opacity-60">Watch the live queue board</p>
                 </div>
               </div>
               <span className="text-xl">→</span>
            </Link>

            <Link to="/about" className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-light-orange hover:text-matt-black transition-all group">
               <div className="flex items-center space-x-4">
                 <Info className="text-light-orange group-hover:text-matt-black" />
                 <div>
                   <p className="font-bold">About Our Center</p>
                   <p className="text-xs opacity-60">Facilities & Visiting Hours</p>
                 </div>
               </div>
               <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Staff Login Side */}
      <div className="md:w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="max-w-md w-full">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-black text-matt-black">Staff Login</h1>
            <p className="text-gray-500 mt-2">Enter your credentials to manage queues</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 font-medium">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Work Email</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-soft-gray focus:ring-2 focus:ring-light-orange outline-none transition-all text-matt-black font-medium"
                placeholder="staff@qmaster.med"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Access Password</label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-soft-gray focus:ring-2 focus:ring-light-orange outline-none transition-all text-matt-black font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-matt-black text-white font-black py-5 rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all transform active:scale-[0.98] uppercase tracking-widest"
            >
              Authorize Login
            </button>

            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 text-[10px] text-gray-500 flex justify-between uppercase">
              <span>Admin: admin@test.com / admin</span>
              <span>Staff: staff@test.com / staff</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
