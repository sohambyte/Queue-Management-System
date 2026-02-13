
import React, { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';
import { Service } from '../types';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ManageServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    averageTimeMinutes: 15
  });

  const loadServices = async () => {
    const data = await mockApi.getServices();
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mockApi.addService({
      ...formData,
      status: true
    });
    setIsModalOpen(false);
    loadServices();
    setFormData({ serviceName: '', description: '', averageTimeMinutes: 15 });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-matt-black">Manage Services</h1>
          <p className="text-gray-500">Configure your departments and time estimates</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-matt-black text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-black transition-all"
        >
          <Plus size={20} />
          <span>Add Service</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-soft-gray text-gray-600 font-semibold text-sm uppercase">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Service Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Avg. Time</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-gray-500">#{service.id}</td>
                <td className="px-6 py-4 font-bold text-matt-black">{service.serviceName}</td>
                <td className="px-6 py-4 text-gray-500">{service.description}</td>
                <td className="px-6 py-4">
                  <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                    {service.averageTimeMinutes} mins
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center space-x-1.5 text-green-600 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Active</span>
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button className="text-gray-400 hover:text-blue-500 transition-colors"><Edit2 size={18} /></button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 transform animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold mb-6 text-matt-black">Create New Service</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Service Name</label>
                <input 
                  type="text" required 
                  className="w-full p-3 bg-soft-gray rounded-lg border-none focus:ring-2 focus:ring-light-orange text-matt-black"
                  value={formData.serviceName}
                  onChange={e => setFormData({...formData, serviceName: e.target.value})}
                  placeholder="e.g. Cardiology"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Description</label>
                <textarea 
                  className="w-full p-3 bg-soft-gray rounded-lg border-none focus:ring-2 focus:ring-light-orange h-24 text-matt-black"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Short description..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Avg. Time (minutes)</label>
                <input 
                  type="number" required 
                  className="w-full p-3 bg-soft-gray rounded-lg border-none focus:ring-2 focus:ring-light-orange text-matt-black"
                  value={formData.averageTimeMinutes}
                  onChange={e => setFormData({...formData, averageTimeMinutes: parseInt(e.target.value)})}
                />
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
