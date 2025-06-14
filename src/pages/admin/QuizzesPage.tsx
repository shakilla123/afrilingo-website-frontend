
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { List, Eye, Edit, Trash2, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SearchFilter } from '@/components/admin/shared/SearchFilter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { quizService, Quiz } from '@/services/quizService';
import { useNavigate } from 'react-router-dom';

export default function QuizzesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: quizzes = [], isLoading, error } = useQuery({
    queryKey: ['quizzes'],
    queryFn: quizService.getAll,
  });

  const handleCreateQuiz = () => {
    navigate('/admin/quizzes/new');
  };

  const handleViewQuiz = (quizId: number) => {
    navigate(`/admin/quizzes/${quizId}/view`);
  };

  const handleEditQuiz = (quizId: number) => {
    navigate(`/admin/quizzes/${quizId}/edit`);
  };

  const handleDeleteQuiz = async (quizId: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        await quizService.delete(quizId);
        queryClient.invalidateQueries({ queryKey: ['quizzes'] });
        toast({
          title: "Quiz Deleted",
          description: `"${title}" has been deleted successfully.`,
        });
        window.location.reload();
      } catch (error) {
        console.error('Delete quiz error:', error);
        toast({
          title: "Delete Failed",
          description: `Failed to delete "${title}". Please try again.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Quizzes",
      description: searchQuery ? `Searching for: "${searchQuery}"` : "Please enter a search term",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Quizzes",
      description: "Opening filter options...",
    });
  };

  // Filter quizzes based on search query
  const filteredQuizzes = quizzes.filter((quiz: Quiz) => {
    if (!searchQuery) return true;
    return quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           quiz.lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-amber-700">Loading quizzes...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center text-red-600 p-8">
          <p>Failed to load quizzes. Please try again.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Quizzes</h1>
            <p className="text-amber-700">Manage quiz questions and assessments</p>
          </div>
          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleCreateQuiz}
          >
            <List className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          onFilter={handleFilter}
          placeholder="Search quizzes..."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz: Quiz) => (
            <Card key={quiz.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧠</span>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg text-amber-900 truncate">{quiz.title}</CardTitle>
                      <p className="text-sm text-amber-600">Lesson: {quiz.lesson.title}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    Quiz
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-amber-700 line-clamp-2">{quiz.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-amber-900">
                        {quiz.questions?.length || 0}
                      </div>
                      <div className="text-xs text-amber-600">Questions</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-amber-900 flex items-center justify-center gap-1">
                        <Target className="h-4 w-4" />
                        {quiz.minPassingScore}%
                      </div>
                      <div className="text-xs text-amber-600">Min Score</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleViewQuiz(quiz.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleEditQuiz(quiz.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-300 text-red-700 hover:bg-red-100"
                      onClick={() => handleDeleteQuiz(quiz.id, quiz.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQuizzes.length === 0 && quizzes.length > 0 && (
          <div className="text-center py-12">
            <List className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-amber-900 mb-2">No quizzes found</h3>
            <p className="text-amber-600 mb-6">Try adjusting your search terms.</p>
          </div>
        )}

        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <List className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-amber-900 mb-2">No quizzes yet</h3>
            <p className="text-amber-600 mb-6">Get started by creating your first quiz.</p>
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={handleCreateQuiz}
            >
              <List className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
