
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminAuth from './AdminAuth';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-divine-purple mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <AdminAuth />;
  }

  return <AdminDashboard />;
};

export default Admin;
