
import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';
import { Counter, Service } from '../types';
import { Plus, Monitor } from 'lucide-react';

const ManageCounters: React.FC = () => {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    counterName: '',
    serviceId: 1
  });

  const loadData = async () => {
    const [c, s] = await Promise.all([mockApi.getCounters(), mockApi.getServices()]);
    setCounters(c);
    setServices(s);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mockApi.addCounter({
      ...formData,
      status: true
    });
    setIsModalOpen(false);
    loadData();
    setFormData({ counterName: '', serviceId: 1 });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-matt-black">Manage Counters</h1>
          <p className="text-gray-500">Assign physical booths to specific services</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-matt-black text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-black transition-all"
        >
          <Plus size={20} />
          <span>Add Counter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {counters.map(counter => (
          <div key={counter.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="w-16 h-16 bg-soft-gray rounded-2xl flex items-center justify-center text-light-orange">
              <Monitor size={32} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-matt-black">{counter.counterName}</h3>
              <p className="text-sm text-gray-500">
                Service: <span className="text-matt-black font-semibold">
                  {services.find(s => s.id === counter.serviceId)?.serviceName || 'Unknown'}
                </span>
              </p>
              <div className="mt-2 flex items-center space-x-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                 <span className="text-xs font-bold text-green-600 uppercase">Online</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-matt-black">Setup Counter</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Counter Name</label>
                <input 
                  type="text" required 
                  className="w-full p-3 bg-soft-gray rounded-lg border-none focus:ring-2 focus:ring-light-orange text-matt-black"
                  value={formData.counterName}
                  onChange={e => setFormData({...formData, counterName: e.target.value})}
                  placeholder="e.g. Window A"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Assigned Service</label>
                <select 
                  className="w-full p-3 bg-soft-gray rounded-lg border-none focus:ring-2 focus:ring-light-orange text-matt-black"
                  value={formData.serviceId}
                  onChange={e => setFormData({...formData, serviceId: parseInt(e.target.value)})}
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.serviceName}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 font-bold bg-light-orange text-matt-black rounded-lg hover:shadow-lg transition-all"
                >
                  Assign Counter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCounters;
