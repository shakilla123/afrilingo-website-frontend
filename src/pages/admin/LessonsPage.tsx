
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Clock, Users, Play, Edit, Trash2, Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { lessonService, Lesson } from '@/services/lessonService';

export default function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const { data: lessons = [], isLoading, error } = useQuery({
    queryKey: ['lessons'],
    queryFn: lessonService.getAll,
  });

  const handlePreviewLesson = (lessonId: number, title: string) => {
    toast({
      title: "Preview Lesson",
      description: `Previewing "${title}"`,
    });
  };

  const handleEditLesson = (lessonId: number, title: string) => {
    toast({
      title: "Edit Lesson",
      description: `Editing "${title}"`,
    });
  };

  const handleDeleteLesson = async (lessonId: number, title: string) => {
    try {
      await lessonService.delete(lessonId);
      toast({
        title: "Lesson Deleted",
        description: `"${title}" has been deleted successfully.`,
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: `Failed to delete "${title}". Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Lessons",
      description: searchQuery ? `Searching for: "${searchQuery}"` : "Please enter a search term",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Lessons",
      description: "Opening filter options...",
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-amber-700">Loading lessons...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center text-red-600 p-8">
          <p>Failed to load lessons. Please try again.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Lessons</h1>
            <p className="text-amber-700">Create and manage lesson content</p>
          </div>
          <Link to="/admin/lessons/new">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Lesson
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="border-amber-200">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
                <Input 
                  placeholder="Search lessons..." 
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson: Lesson) => (
            <Card key={lesson.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-amber-900 flex-1 min-w-0">
                    <span className="truncate">{lesson.title}</span>
                  </CardTitle>
                  <div className="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 bg-blue-100 text-blue-800">
                    {lesson.lessonType}
                  </div>
                </div>
                <p className="text-sm text-amber-600">{lesson.course.title}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-amber-700 line-clamp-2">{lesson.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{lesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      <BookOpen className="h-4 w-4 flex-shrink-0" />
                      <span>Order: {lesson.orderIndex}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handlePreviewLesson(lesson.id, lesson.title)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleEditLesson(lesson.id, lesson.title)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-300 text-red-700 hover:bg-red-100"
                      onClick={() => handleDeleteLesson(lesson.id, lesson.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-amber-900 mb-2">No lessons yet</h3>
            <p className="text-amber-600 mb-6">Get started by creating your first lesson.</p>
            <Link to="/admin/lessons/new">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Lesson
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
