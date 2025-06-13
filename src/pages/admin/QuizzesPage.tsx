
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QuizCard } from '@/components/admin/quizzes/QuizCard';
import { SearchFilter } from '@/components/admin/shared/SearchFilter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { quizService, Quiz } from '@/services/quizService';
import { Link, useNavigate } from 'react-router-dom';

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

  const handleViewResults = (quizId: number, title: string) => {
    toast({
      title: "Quiz Results",
      description: `Viewing results for "${title}"`,
    });
  };

  const handleEditQuiz = (quizId: number, title: string) => {
    toast({
      title: "Edit Quiz",
      description: `Editing "${title}"`,
    });
  };

  const handleDeleteQuiz = async (quizId: number, title: string) => {
    try {
      await quizService.delete(quizId);
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      toast({
        title: "Quiz Deleted",
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

  const handleViewQuiz = (quizId: number, title: string) => {
    toast({
      title: "View Quiz",
      description: `Opening "${title}" preview`,
    });
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

  // Transform quiz data to match the expected format for QuizCard
  const transformedQuizzes = quizzes.map((quiz: Quiz) => ({
    id: quiz.id,
    title: quiz.title,
    questions: 0, // Will need to fetch this separately or include in API
    attempts: 0, // Will need to fetch from statistics
    avgScore: 0, // Will need to fetch from statistics
    status: "Published" // Default status
  }));

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
          {transformedQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onViewQuiz={handleViewQuiz}
              onViewResults={handleViewResults}
              onEditQuiz={handleEditQuiz}
              onDeleteQuiz={handleDeleteQuiz}
            />
          ))}
        </div>

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
