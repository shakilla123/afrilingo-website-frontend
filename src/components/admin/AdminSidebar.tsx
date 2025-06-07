
import React from 'react';
import { LayoutDashboard, Book, Settings, User, Search, List } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: "Dashboard Home",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    url: "#",
    icon: Book,
  },
  {
    title: "Quizzes",
    url: "#",
    icon: List,
  },
  {
    title: "Bonus Challenges",
    url: "#",
    icon: Search,
  },
  {
    title: "User Progress",
    url: "#",
    icon: User,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AdminSidebar() {
  return (
    <Sidebar className="bg-amber-900 text-amber-50">
      <SidebarHeader className="p-6 border-b border-amber-800">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/11afa540-f243-4c5a-93e4-f75f0daebf89.png" 
            alt="Afrilingo Logo" 
            className="h-10 w-10 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-amber-50">Afrilingo</h2>
            <p className="text-sm text-amber-200">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-300 font-semibold px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="text-amber-100 hover:bg-amber-800 hover:text-amber-50 data-[active=true]:bg-amber-700"
                  >
                    <a href={item.url} className="flex items-center gap-3 px-4 py-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-amber-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-amber-100" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-50">Admin User</p>
            <p className="text-xs text-amber-200">admin@afrilingo.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
