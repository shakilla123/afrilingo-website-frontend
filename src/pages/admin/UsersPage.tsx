
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserStats } from '@/components/admin/users/UserStats';
import { UsersTable } from '@/components/admin/users/UsersTable';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState(mockUsers);
  const { toast } = useToast();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserAction = (action: string, user: any) => {
    toast({
      title: `${action} User`,
      description: `${action} ${user.name}`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
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

        {/* Stats Cards */}
        <UserStats users={users} />

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-900">Search Users</CardTitle>
            <CardDescription>Find and manage Kinyarwanda learners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
              <Input
                placeholder="Search by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-amber-300 focus:border-amber-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <UsersTable users={filteredUsers} onUserAction={handleUserAction} />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
