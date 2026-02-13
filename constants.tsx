
import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Monitor, 
  Ticket, 
  Users, 
  BarChart3, 
  Layers,
  Info,
  Smartphone
} from 'lucide-react';

export const COLORS = {
  primary: '#FFB347', // Light Orange
  secondary: '#1A1A1A', // Matt Black
  accent: '#F5F5F5', // Soft Gray
};

export const NAVIGATION_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: ['ADMIN'] },
  { path: '/services', label: 'Services', icon: <Layers size={20} />, roles: ['ADMIN'] },
  { path: '/counters', label: 'Counters', icon: <Settings size={20} />, roles: ['ADMIN'] },
  { path: '/generate-token', label: 'New Token', icon: <Ticket size={20} />, roles: ['ADMIN', 'RECEPTION'] },
  { path: '/staff-panel', label: 'Staff Panel', icon: <Users size={20} />, roles: ['ADMIN', 'STAFF'] },
  { path: '/display', label: 'Live Queue', icon: <Monitor size={20} />, roles: ['ADMIN', 'STAFF', 'RECEPTION'] },
  { path: '/reports', label: 'Reports', icon: <BarChart3 size={20} />, roles: ['ADMIN'] },
  { path: '/about', label: 'About Us', icon: <Info size={20} />, roles: ['ADMIN', 'STAFF', 'RECEPTION'] },
];

export const PUBLIC_NAVIGATION = [
  { path: '/get-token', label: 'Get Token', icon: <Smartphone size={20} /> },
  { path: '/display', label: 'Live Queue', icon: <Monitor size={20} /> },
  { path: '/about', label: 'About Us', icon: <Info size={20} /> },
];
