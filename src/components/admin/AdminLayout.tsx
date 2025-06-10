
import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { SidebarProvider } from '@/components/ui/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ml-0">
          <AdminHeader />
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            <div className="max-w-full mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
