
import React from 'react';
import { Book, List, Search, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const actions = [
  {
    title: "Create New Course",
    description: "Add a new language course",
    icon: Book,
    color: "bg-amber-600 hover:bg-amber-700"
  },
  {
    title: "Create Quiz",
    description: "Add quiz questions",
    icon: List,
    color: "bg-green-600 hover:bg-green-700"
  },
  {
    title: "Bonus Challenge",
    description: "Create special challenge",
    icon: Search,
    color: "bg-purple-600 hover:bg-purple-700"
  },
  {
    title: "Manage Settings",
    description: "Configure dashboard",
    icon: Settings,
    color: "bg-blue-600 hover:bg-blue-700"
  }
];

export function QuickActions() {
  return (
    <Card className="border-amber-200">
      <CardHeader>
        <CardTitle className="text-amber-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className={`h-auto p-4 flex flex-col items-center gap-2 border-amber-300 text-amber-700 hover:bg-amber-50`}
            >
              <action.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-amber-600">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
