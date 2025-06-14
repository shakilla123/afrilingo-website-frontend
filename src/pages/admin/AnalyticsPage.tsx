
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdvancedSearchFilter } from '@/components/admin/shared/AdvancedSearchFilter';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';
import { BarChart3, TrendingUp, Users, BookOpen, Trophy, Target } from 'lucide-react';

export default function AnalyticsPage() {
  const {
    searchQuery,
    filters,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
    handleSearch,
  } = useSearchAndFilter({
    onSearch: async (query, filters) => {
      console.log('Searching analytics:', { query, filters });
      // Implement analytics search logic here
    }
  });

  const filterOptions = {
    category: [
      { value: 'courses', label: 'Courses' },
      { value: 'users', label: 'Users' },
      { value: 'engagement', label: 'Engagement' },
      { value: 'performance', label: 'Performance' }
    ],
    dateRange: true
  };

  const analyticsData = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Courses",
      value: "56",
      change: "+8%",
      icon: BookOpen,
      color: "text-green-600"
    },
    {
      title: "Completed Challenges",
      value: "892",
      change: "+24%",
      icon: Trophy,
      color: "text-yellow-600"
    },
    {
      title: "Avg. Completion Rate",
      value: "78%",
      change: "+5%",
      icon: Target,
      color: "text-purple-600"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-amber-900">Analytics Dashboard</h1>
        </div>

        <AdvancedSearchFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
          placeholder="Search analytics data..."
          filterOptions={filterOptions}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.map((item) => (
            <Card key={item.title} className="border-amber-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-800">
                  {item.title}
                </CardTitle>
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-900">{item.value}</div>
                <p className="text-xs text-green-600">
                  {item.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                User Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-amber-600">
                Analytics chart will be implemented here
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Course Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-amber-600">
                Performance metrics will be displayed here
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
