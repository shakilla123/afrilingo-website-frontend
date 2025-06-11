
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, MoreHorizontal, Mail, Shield, Calendar } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

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

  const getStatusBadge = (status: string) => {
    return status === 'Active' ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      Student: "bg-blue-100 text-blue-800",
      Instructor: "bg-purple-100 text-purple-800", 
      Moderator: "bg-orange-100 text-orange-800",
      Admin: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={`${roleColors[role as keyof typeof roleColors]} hover:${roleColors[role as keyof typeof roleColors]}`}>
        {role}
      </Badge>
    );
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{users.length}</div>
              <p className="text-xs text-blue-600 mt-1">Kinyarwanda community</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {users.filter(u => u.status === 'Active').length}
              </div>
              <p className="text-xs text-green-600 mt-1">Currently learning</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Instructors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
                {users.filter(u => u.role === 'Instructor').length}
              </div>
              <p className="text-xs text-purple-600 mt-1">Teaching Kinyarwanda</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Avg. Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">
                {Math.round(users.reduce((acc, u) => acc + u.completionRate, 0) / users.length)}%
              </div>
              <p className="text-xs text-orange-600 mt-1">Course progress</p>
            </CardContent>
          </Card>
        </div>

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
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-900">All Users ({filteredUsers.length})</CardTitle>
            <CardDescription>Manage your Kinyarwanda learning community</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <div className="font-medium text-amber-900">{user.name}</div>
                          <div className="text-sm text-amber-600">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{user.coursesEnrolled}</span>
                        <span className="text-amber-600 text-sm">courses</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-2 bg-amber-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                            style={{ width: `${user.completionRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{user.completionRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-amber-700">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">{user.joinDate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUserAction('View', user)}>
                            <Shield className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction('Edit', user)}>
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction('Email', user)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleUserAction('Suspend', user)}
                            className="text-red-600"
                          >
                            Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
