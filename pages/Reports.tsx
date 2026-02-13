
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Download } from 'lucide-react';

const Reports: React.FC = () => {
  const dataDaily = [
    { name: 'Mon', count: 45 },
    { name: 'Tue', count: 52 },
    { name: 'Wed', count: 38 },
    { name: 'Thu', count: 65 },
    { name: 'Fri', count: 48 },
    { name: 'Sat', count: 20 },
    { name: 'Sun', count: 15 },
  ];

  const dataService = [
    { name: 'OPD General', value: 400 },
    { name: 'Pharmacy', value: 300 },
    { name: 'Radiology', value: 150 },
    { name: 'Laboratory', value: 100 },
  ];

  const COLORS_CHART = ['#FFB347', '#1A1A1A', '#4A4A4A', '#8A8A8A'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-matt-black">Performance Reports</h1>
          <p className="text-gray-500">Analyze volume and efficiency metrics</p>
        </div>
        <button className="bg-soft-gray border border-gray-200 px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-white transition-all">
          <Download size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6">Daily Volume (Last 7 Days)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataDaily}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255, 179, 71, 0.1)'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="count" fill="#FFB347" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-6">Service Distribution</h3>
          <div className="h-[300px] flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataService}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataService.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_CHART[index % COLORS_CHART.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="w-1/3 space-y-2">
                {dataService.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS_CHART[idx]}}></div>
                    <span className="text-gray-500 truncate">{item.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="bg-matt-black text-white p-10 rounded-[2.5rem] flex items-center justify-between">
         <div className="space-y-2">
            <h3 className="text-2xl font-bold text-light-orange">Operational Insights</h3>
            <p className="text-gray-400 max-w-md">The peak traffic is observed on Thursdays at 11:00 AM. Consider adding an extra counter for Pharmacy during this time to reduce wait times by an estimated 15%.</p>
         </div>
         <div className="text-right">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Weekly Efficiency</p>
            <p className="text-5xl font-black text-white">92.4%</p>
         </div>
      </div>
    </div>
  );
};

export default Reports;
