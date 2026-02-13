
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole } from './types';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManageServices from './pages/ManageServices';
import ManageCounters from './pages/ManageCounters';
import GenerateToken from './pages/GenerateToken';
import QueueDisplay from './pages/QueueDisplay';
import StaffPanel from './pages/StaffPanel';
import Reports from './pages/Reports';
import AboutUs from './pages/AboutUs';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={user.role === UserRole.ADMIN ? '/admin' : user.role === UserRole.STAFF ? '/staff-panel' : '/generate-token'} />} 
        />
        
        {/* Public Routes - Accessible to anyone */}
        <Route path="/display" element={<QueueDisplay />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/get-token" element={<GenerateToken isPublic={true} />} />

        {/* Protected Routes */}
        <Route element={<Layout user={user} onLogout={handleLogout} />}>
          <Route path="/admin" element={user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/services" element={user?.role === UserRole.ADMIN ? <ManageServices /> : <Navigate to="/login" />} />
          <Route path="/counters" element={user?.role === UserRole.ADMIN ? <ManageCounters /> : <Navigate to="/login" />} />
          <Route path="/generate-token" element={(user?.role === UserRole.ADMIN || user?.role === UserRole.RECEPTION) ? <GenerateToken /> : <Navigate to="/login" />} />
          <Route path="/staff-panel" element={(user?.role === UserRole.ADMIN || user?.role === UserRole.STAFF) ? <StaffPanel user={user!} /> : <Navigate to="/login" />} />
          <Route path="/reports" element={user?.role === UserRole.ADMIN ? <Reports /> : <Navigate to="/login" />} />
        </Route>

        <Route path="/" element={<Navigate to={user ? (user.role === UserRole.ADMIN ? '/admin' : '/staff-panel') : '/login'} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
