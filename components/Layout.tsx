
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';
import { NAVIGATION_ITEMS, COLORS } from '../constants';
import { LogOut, User as UserIcon } from 'lucide-react';

interface LayoutProps {
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const location = useLocation();

  if (!user) return <Outlet />;

  const filteredNav = NAVIGATION_ITEMS.filter(item => item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-soft-gray overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-matt-black text-white flex flex-col hidden md:flex">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-light-orange rounded-lg flex items-center justify-center text-matt-black font-bold text-xl">
            Q
          </div>
          <span className="text-xl font-bold tracking-tight">Q-Master Pro</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {filteredNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-light-orange text-matt-black' 
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 p-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <UserIcon size={16} />
            </div>
            <div className="flex-1 truncate">
              <p className="font-semibold text-white">{user.name}</p>
              <p className="text-gray-400 text-xs">{user.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors mt-2"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto">
        <header className="md:hidden bg-matt-black text-white p-4 flex justify-between items-center sticky top-0 z-50">
           <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-light-orange rounded flex items-center justify-center text-matt-black font-bold">Q</div>
            <span className="font-bold">Q-Master</span>
           </div>
           <button onClick={onLogout} className="text-red-400"><LogOut size={20}/></button>
        </header>
        
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
