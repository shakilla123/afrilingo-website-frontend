
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserStats } from '@/components/admin/users/UserStats';
import { UsersTable } from '@/components/admin/users/UsersTable';
import { AdvancedSearchFilter } from '@/components/admin/shared/AdvancedSearchFilter';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Marie Uwimana",
    email: "marie@example.com",
    role: "Student",
    status: "Active",
    joinDate: "2024-01-15",
    coursesEnrolled: 3,
    completionRate: 85,
    avatar: "🇷🇼"
  },
  {
    id: 2,
    name: "Jean Baptiste Nzeyimana",
    email: "jean@example.com",
    role: "Student",
    status: "Active", 
    joinDate: "2024-02-20",
    coursesEnrolled: 2,
    completionRate: 92,
    avatar: "🇷🇼"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Instructor",
    status: "Active",
    joinDate: "2023-11-10",
    coursesEnrolled: 5,
    completionRate: 78,
    avatar: "🌍"
  },
  {
    id: 4,
    name: "Emmanuel Habimana",
    email: "emmanuel@example.com",
    role: "Student",
    status: "Inactive",
    joinDate: "2024-03-05",
    coursesEnrolled: 1,
    completionRate: 45,
    avatar: "🇷🇼"
  },
  {
    id: 5,
    name: "Grace Mukamana",
    email: "grace@example.com",
    role: "Moderator",
    status: "Active",
    joinDate: "2023-12-01",
    coursesEnrolled: 4,
    completionRate: 95,
    avatar: "🇷🇼"
  }
];

const UsersPage = () => {
  const { toast } = useToast();

  const {
    searchQuery,
    filters,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
    handleSearch,
  } = useSearchAndFilter();

  // Filter users based on search query and filters
  const filteredUsers = mockUsers.filter(user => {
    // Search filter
    const matchesSearch = !searchQuery ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = !filters.status ||
      user.status.toLowerCase() === filters.status.toLowerCase();

    // Role filter
    const matchesRole = !filters.category ||
      user.role.toLowerCase() === filters.category.toLowerCase();

    return matchesSearch && matchesStatus && matchesRole;
  });

  const filterOptions = {
    status: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ],
    category: [
      { value: 'student', label: 'Student' },
      { value: 'instructor', label: 'Instructor' },
      { value: 'moderator', label: 'Moderator' }
    ]
  };

  const handleUserAction = (action: string, user: any) => {
    toast({
      title: `${action} User`,
      description: `${action} ${user.name}`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-amber-900">User Management</h2>
            <p className="text-amber-700 mt-1">Manage Kinyarwanda learners and instructors</p>
          </div>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>

        <UserStats users={mockUsers} />

        <AdvancedSearchFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
          placeholder="Search by name, email, or role..."
          filterOptions={filterOptions}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <UsersTable users={filteredUsers} onUserAction={handleUserAction} />

        {filteredUsers.length === 0 && mockUsers.length > 0 && (
          <div className="text-center py-12">
            <div className="h-12 w-12 text-amber-400 mx-auto mb-4">👥</div>
            <h3 className="text-lg font-medium text-amber-900 mb-2">No users found</h3>
            <p className="text-amber-600 mb-6">Try adjusting your search terms or filters.</p>
            <Button 
              onClick={handleClearFilters}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
