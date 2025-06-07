
import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DashboardHome } from '@/components/admin/DashboardHome';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-amber-50">
        <AdminSidebar />
        <main className="flex-1 flex flex-col">
          <AdminHeader />
          <div className="flex-1 p-6">
            <DashboardHome />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
