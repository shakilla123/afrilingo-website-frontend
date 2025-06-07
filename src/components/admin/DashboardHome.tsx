
import React from 'react';
import { StatsCards } from './StatsCards';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-amber-900 mb-2">Welcome back, Admin!</h2>
        <p className="text-amber-700">Manage your language learning content and track progress.</p>
      </div>
      
      <StatsCards />
      
      <div className="grid lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
}
