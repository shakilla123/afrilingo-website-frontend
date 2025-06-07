
import React from 'react';
import { StatsCards } from './StatsCards';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { PopularCourses } from './PopularCourses';
import { UserProgress } from './UserProgress';

export function DashboardHome() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl p-8 shadow-lg border border-amber-200">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-orange-300/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-red-300/20 to-pink-300/20 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">👋</div>
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-2">Welcome back, Admin!</h2>
              <p className="text-amber-700 text-lg">Ready to empower African language learning today?</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-200/50">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-sm font-medium text-amber-800">Platform Status</div>
              <div className="text-xs text-amber-600">All systems operational</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-200/50">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm font-medium text-amber-800">Growth This Week</div>
              <div className="text-xs text-amber-600">+23% new learners</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-amber-200/50">
              <div className="text-2xl mb-2">🌍</div>
              <div className="text-sm font-medium text-amber-800">Global Reach</div>
              <div className="text-xs text-amber-600">47 countries active</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <StatsCards />
      
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Actions and Activity */}
        <div className="lg:col-span-2 space-y-8">
          <QuickActions />
          <PopularCourses />
        </div>
        
        {/* Right Column - Activity and Progress */}
        <div className="space-y-8">
          <RecentActivity />
          <UserProgress />
        </div>
      </div>
    </div>
  );
}
