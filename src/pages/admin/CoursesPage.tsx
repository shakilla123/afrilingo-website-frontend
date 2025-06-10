
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, Search, Plus, Users, Star, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const courses = [
  {
    id: 1,
    title: "Swahili Basics",
    language: "Swahili",
    level: "Beginner",
    students: 1248,
    lessons: 24,
    rating: 4.8,
    status: "Published",
    flag: "🇹🇿",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Yoruba Fundamentals",
    language: "Yoruba",
    level: "Beginner",
    students: 892,
    lessons: 18,
    rating: 4.7,
    status: "Published",
    flag: "🇳🇬",
    createdAt: "2024-02-01"
  },
  {
    id: 3,
    title: "Amharic Expressions",
    language: "Amharic",
    level: "Intermediate",
    students: 634,
    lessons: 32,
    rating: 4.9,
    status: "Published",
    flag: "🇪🇹",
    createdAt: "2024-02-10"
  },
  {
    id: 4,
    title: "Zulu Conversations",
    language: "Zulu",
    level: "Advanced",
    students: 567,
    lessons: 28,
    rating: 4.6,
    status: "Draft",
    flag: "🇿🇦",
    createdAt: "2024-03-01"
  }
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Courses",
      description: searchQuery ? `Searching for: "${searchQuery}"` : "Please enter a search term",
    });
  };

  const handleCreateCourse = () => {
    toast({
      title: "Create Course",
      description: "Opening course creation form...",
    });
  };

  const handleEditCourse = (courseId: number, title: string) => {
    toast({
      title: "Edit Course",
      description: `Editing "${title}"`,
    });
  };

  const handleDeleteCourse = (courseId: number, title: string) => {
    toast({
      title: "Delete Course",
      description: `Are you sure you want to delete "${title}"?`,
      variant: "destructive",
    });
  };

  const handleViewCourse = (courseId: number, title: string) => {
    toast({
      title: "View Course",
      description: `Opening "${title}" details`,
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Courses",
      description: "Opening filter options...",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Courses</h1>
            <p className="text-amber-700">Manage your language courses</p>
          </div>
          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleCreateCourse}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-amber-200">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
                <Input 
                  placeholder="Search courses..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-amber-300 focus:border-amber-500"
                />
              </div>
              <Button 
                type="submit"
                variant="outline" 
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                Search
              </Button>
              <Button 
                type="button"
                variant="outline" 
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={handleFilter}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{course.flag}</div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg text-amber-900 truncate">{course.title}</CardTitle>
                      <p className="text-sm text-amber-600">{course.language} • {course.level}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    course.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-amber-900">{course.students}</div>
                      <div className="text-xs text-amber-600">Students</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-900">{course.lessons}</div>
                      <div className="text-xs text-amber-600">Lessons</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-900 flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        {course.rating}
                      </div>
                      <div className="text-xs text-amber-600">Rating</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleViewCourse(course.id, course.title)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleEditCourse(course.id, course.title)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-300 text-red-700 hover:bg-red-100"
                      onClick={() => handleDeleteCourse(course.id, course.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
