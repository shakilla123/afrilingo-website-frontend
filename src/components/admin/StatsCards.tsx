
import React from 'react';
import { Book, User, List, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    title: "Total Languages",
    value: "8",
    description: "Active languages",
    icon: Book,
    color: "bg-amber-100 text-amber-800"
  },
  {
    title: "Active Courses",
    value: "24",
    description: "Published courses",
    icon: Book,
    color: "bg-green-100 text-green-800"
  },
  {
    title: "New Learners",
    value: "156",
    description: "This week",
    icon: User,
    color: "bg-blue-100 text-blue-800"
  },
  {
    title: "Total Quizzes",
    value: "89",
    description: "All quizzes created",
    icon: List,
    color: "bg-purple-100 text-purple-800"
  }
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{stat.value}</div>
            <p className="text-xs text-amber-600">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
