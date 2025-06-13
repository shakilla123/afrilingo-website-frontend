
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { SearchFilter } from '@/components/admin/shared/SearchFilter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { lessonService, Lesson } from '@/services/lessonService';

export default function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: lessons = [], isLoading, error } = useQuery({
    queryKey: ['lessons'],
    queryFn: lessonService.getAll,
  });

  const handleCreateLesson = () => {
    navigate('/admin/lessons/new');
  };

  const handleViewLesson = (lessonId: number) => {
    navigate(`/admin/lessons/${lessonId}/view`);
  };

  const handleEditLesson = (lessonId: number, title: string) => {
    toast({
      title: "Edit Lesson",
      description: `Editing "${title}" - Edit functionality coming soon`,
    });
  };

  const handleDeleteLesson = async (lessonId: number, title: string) => {
    try {
      await lessonService.delete(lessonId);
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
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

  const getLessonTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return '🎥';
      case 'audio': return '🎵';
      case 'text': return '📖';
      case 'interactive': return '🎯';
      default: return '📚';
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      case 'text': return 'bg-green-100 text-green-800';
      case 'interactive': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <p className="text-amber-700">Manage course lessons and content</p>
          </div>
          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleCreateLesson}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Create Lesson
          </Button>
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          onFilter={handleFilter}
          placeholder="Search lessons..."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson: Lesson) => (
            <Card key={lesson.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getLessonTypeIcon(lesson.lessonType)}</span>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg text-amber-900 truncate">{lesson.title}</CardTitle>
                      <p className="text-sm text-amber-600">Course: {lesson.course.title}</p>
                    </div>
                  </div>
                  <Badge className={getLessonTypeColor(lesson.lessonType)}>
                    {lesson.lessonType}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-amber-700 line-clamp-2">{lesson.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-amber-600">
                    <span>Order: {lesson.orderIndex}</span>
                    <span>{lesson.duration}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleViewLesson(lesson.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleEditLesson(lesson.id, lesson.title)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
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
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={handleCreateLesson}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Create Lesson
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
