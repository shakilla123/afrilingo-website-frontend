
import React from 'react';
import { LayoutDashboard, Book, Settings, User, Search, List, Users, BarChart3, BookOpen, Trophy } from 'lucide-react';
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
import { useLocation, Link } from 'react-router-dom';

const menuItems = [
  {
    title: "Dashboard Home",
    url: "/admin",
    icon: LayoutDashboard,
    description: "Overview & Analytics"
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: Book,
    description: "Manage Language Courses"
  },
  {
    title: "Lessons",
    url: "/admin/lessons",
    icon: BookOpen,
    description: "Create & Edit Lessons"
  },
  {
    title: "Quizzes",
    url: "/admin/quizzes",
    icon: List,
    description: "Quiz Management"
  },
  {
    title: "Challenges",
    url: "/admin/challenges",
    icon: Trophy,
    description: "Bonus Challenges"
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    description: "User Management"
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
    description: "Progress & Statistics"
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
    description: "System Configuration"
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 text-amber-50 shadow-2xl">
      <SidebarHeader className="p-6 border-b border-amber-700/50 bg-gradient-to-r from-amber-800/30 to-amber-700/20">
        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
          <div className="relative">
            <img 
              src="/lovable-uploads/11afa540-f243-4c5a-93e4-f75f0daebf89.png" 
              alt="Afrilingo Logo" 
              className="h-12 w-12 rounded-xl object-cover shadow-lg ring-2 ring-amber-300/30"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-amber-900 animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-amber-50 tracking-wide">Afrilingo</h2>
            <p className="text-sm text-amber-200 font-medium">Admin Portal</p>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-300 font-bold px-4 py-3 text-sm uppercase tracking-wider">
            📊 Management Hub
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        group relative overflow-hidden rounded-xl mx-2 transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-50 shadow-lg scale-105 ring-2 ring-amber-400/50' 
                          : 'text-amber-100 hover:bg-gradient-to-r hover:from-amber-800/50 hover:to-amber-700/30 hover:text-amber-50 hover:scale-105'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center gap-4 px-4 py-3 w-full">
                        <div className={`
                          p-2 rounded-lg transition-all duration-300
                          ${isActive 
                            ? 'bg-amber-500/30 shadow-lg' 
                            : 'bg-amber-800/30 group-hover:bg-amber-600/40'
                          }
                        `}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">{item.title}</div>
                          <div className={`text-xs transition-colors ${isActive ? 'text-amber-200' : 'text-amber-300/80 group-hover:text-amber-200'}`}>
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-1 h-8 bg-amber-300 rounded-full shadow-glow"></div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-amber-700/50 bg-gradient-to-r from-amber-800/20 to-amber-700/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-800/30 hover:bg-amber-700/40 transition-all duration-300 cursor-pointer group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-5 w-5 text-amber-900" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-amber-900"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-50 group-hover:text-amber-100 transition-colors">Admin User</p>
            <p className="text-xs text-amber-200/80 truncate">admin@afrilingo.com</p>
          </div>
          <div className="w-2 h-2 bg-amber-300 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
