
import React from 'react';
import { Search, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-amber-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-amber-800 hover:text-amber-900" />
          <h1 className="text-2xl font-bold text-amber-900">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
            <Input 
              placeholder="Search courses, quizzes..." 
              className="pl-10 w-80 border-amber-300 focus:border-amber-500"
            />
          </div>
          
          <Button variant="outline" size="icon" className="border-amber-300 text-amber-700 hover:bg-amber-100">
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="border-amber-300 text-amber-700 hover:bg-amber-100">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
