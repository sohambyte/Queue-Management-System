
import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';
import { Token, Service, TokenStatus } from '../types';
import { TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    waiting: 0,
    active: 0,
    completed: 0,
    avgWait: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const activeTokens = await mockApi.getActiveTokens();
      const historyTokens = await mockApi.getHistoryTokens();
      const services = await mockApi.getServices();
      
      const waiting = activeTokens.filter(t => t.status === TokenStatus.WAITING).length;
      const active = activeTokens.filter(t => t.status === TokenStatus.CALLED).length;
      const completed = historyTokens.length;

      // Avg wait logic (mocked)
      const avgWait = services.length > 0 ? services.reduce((acc, s) => acc + s.averageTimeMinutes, 0) / services.length : 0;

      setStats({
        waiting,
        active,
        completed,
        avgWait: Math.round(avgWait)
      });
    };
    fetchData();
  }, []);

  const statCards = [
    { label: 'Waiting', value: stats.waiting, icon: <Users className="text-blue-500" />, color: 'bg-blue-50' },
    { label: 'Being Served', value: stats.active, icon: <TrendingUp className="text-orange-500" />, color: 'bg-orange-50' },
    { label: 'Completed Today', value: stats.completed, icon: <CheckCircle2 className="text-green-500" />, color: 'bg-green-50' },
    { label: 'Avg. Wait Time', value: `${stats.avgWait}m`, icon: <Clock className="text-purple-500" />, color: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-matt-black">Dashboard</h1>
        <p className="text-gray-500">Overview of today's queue performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className={`${card.color} p-6 rounded-2xl border border-white/50 shadow-sm transition-transform hover:scale-[1.02]`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">{card.icon}</div>
            </div>
            <p className="text-gray-600 text-sm font-medium">{card.label}</p>
            <h3 className="text-3xl font-bold text-matt-black mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
             <button className="p-4 bg-soft-gray rounded-xl text-left hover:bg-light-orange transition-colors group">
               <p className="font-bold group-hover:text-matt-black">New Token</p>
               <p className="text-xs text-gray-500">Register a patient</p>
             </button>
             <button className="p-4 bg-soft-gray rounded-xl text-left hover:bg-light-orange transition-colors group">
               <p className="font-bold group-hover:text-matt-black">Reports</p>
               <p className="text-xs text-gray-500">View analytics</p>
             </button>
             <button className="p-4 bg-soft-gray rounded-xl text-left hover:bg-light-orange transition-colors group">
               <p className="font-bold group-hover:text-matt-black">Services</p>
               <p className="text-xs text-gray-500">Edit departments</p>
             </button>
             <button className="p-4 bg-soft-gray rounded-xl text-left hover:bg-light-orange transition-colors group">
               <p className="font-bold group-hover:text-matt-black">Settings</p>
               <p className="text-xs text-gray-500">System config</p>
             </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4">Status Legend</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Waiting</span>
              </div>
              <span className="text-sm text-gray-500">Token generated, not called</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Called</span>
              </div>
              <span className="text-sm text-gray-500">Active at a counter</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Completed</span>
              </div>
              <span className="text-sm text-gray-500">Service finished</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
