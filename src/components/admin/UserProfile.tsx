
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function UserProfile() {
  const { toast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const user = {
    name: "Admin User",
    email: "admin@afrilingo.com",
    phone: "+250 788 123 456",
    location: "Kigali, Rwanda",
    joinedDate: "January 2024",
    role: "Administrator",
    avatar: "/lovable-uploads/11afa540-f243-4c5a-93e4-f75f0daebf89.png"
  };

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing form coming soon!",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4">
          <div className="relative">
            <img 
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover mx-auto shadow-lg ring-4 ring-white"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
        <CardTitle className="text-xl text-amber-900">{user.name}</CardTitle>
        <Badge className="bg-amber-100 text-amber-800 mx-auto">{user.role}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-amber-600" />
            <span className="text-amber-700">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-amber-600" />
            <span className="text-amber-700">{user.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-amber-600" />
            <span className="text-amber-700">{user.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-amber-600" />
            <span className="text-amber-700">Joined {user.joinedDate}</span>
          </div>
        </div>
        
        <div className="pt-4 space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-100"
            onClick={handleEditProfile}
          >
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start border-red-300 text-red-700 hover:bg-red-100"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
