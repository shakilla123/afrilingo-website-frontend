
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Clock, Users, Play, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const lessons = [
  { id: 1, title: "Basic Greetings", duration: "15 minutes", students: 248, status: "Published" },
  { id: 2, title: "Family Members", duration: "20 minutes", students: 185, status: "Published" },
  { id: 3, title: "Numbers 1-10", duration: "12 minutes", students: 312, status: "Published" },
  { id: 4, title: "Food & Drinks", duration: "18 minutes", students: 156, status: "Draft" },
  { id: 5, title: "Colors & Shapes", duration: "14 minutes", students: 203, status: "Published" },
  { id: 6, title: "Weather & Seasons", duration: "16 minutes", students: 94, status: "Draft" },
];

export default function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleCreateLesson = () => {
    toast({
      title: "Create Lesson",
      description: "Opening lesson creation form...",
    });
  };

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

  const handleDeleteLesson = (lessonId: number, title: string) => {
    toast({
      title: "Delete Lesson",
      description: `Are you sure you want to delete "${title}"?`,
      variant: "destructive",
    });
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Lessons</h1>
            <p className="text-amber-700">Create and manage lesson content</p>
          </div>
          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleCreateLesson}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Create Lesson
          </Button>
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
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-amber-900 flex-1 min-w-0">
                    <span className="truncate">{lesson.title}</span>
                  </CardTitle>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                    lesson.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lesson.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{lesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span>{lesson.students} students</span>
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
      </div>
    </AdminLayout>
  );
}
