
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
        <main className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
            <div className="max-w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
