
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { UserProfile } from '@/components/admin/UserProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Trophy, BookOpen, Target, Calendar } from 'lucide-react';

const ProfilePage = () => {
  const stats = [
    { label: "Courses Created", value: 12, icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { label: "Total Students", value: 1247, icon: User, color: "from-green-500 to-green-600" },
    { label: "Challenges Created", value: 8, icon: Trophy, color: "from-purple-500 to-purple-600" },
    { label: "Success Rate", value: "94%", icon: Target, color: "from-orange-500 to-orange-600" }
  ];

  const recentActivity = [
    { action: "Created new Swahili course", date: "2 hours ago" },
    { action: "Updated Yoruba pronunciation lesson", date: "1 day ago" },
    { action: "Published weekly challenge", date: "3 days ago" },
    { action: "Responded to student feedback", date: "5 days ago" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-amber-800" />
          <h1 className="text-3xl font-bold text-amber-900">My Profile</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <UserProfile />
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-amber-700">{stat.label}</p>
                        <p className="text-2xl font-bold text-amber-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest actions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-amber-100 last:border-0">
                      <p className="text-amber-800">{activity.action}</p>
                      <Badge variant="outline" className="text-amber-600">{activity.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-900">Platform Performance</CardTitle>
                <CardDescription>Your contribution to student success</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-amber-700">Course Completion Rate</span>
                    <span className="text-amber-900 font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-amber-700">Student Satisfaction</span>
                    <span className="text-amber-900 font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-amber-700">Platform Engagement</span>
                    <span className="text-amber-900 font-medium">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfilePage;
