
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QuizCard } from '@/components/admin/quizzes/QuizCard';
import { SearchFilter } from '@/components/admin/shared/SearchFilter';

const quizzes = [
  { id: 1, title: "Swahili Basics Quiz", questions: 20, attempts: 156, avgScore: 78, status: "Published" },
  { id: 2, title: "Yoruba Greetings", questions: 15, attempts: 89, avgScore: 82, status: "Published" },
  { id: 3, title: "Amharic Numbers", questions: 25, attempts: 234, avgScore: 75, status: "Published" },
  { id: 4, title: "Zulu Vocabulary", questions: 18, attempts: 67, avgScore: 85, status: "Draft" },
  { id: 5, title: "Hausa Phrases", questions: 22, attempts: 123, avgScore: 71, status: "Published" },
  { id: 6, title: "Igbo Grammar", questions: 30, attempts: 45, avgScore: 68, status: "Draft" },
];

export default function QuizzesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleCreateQuiz = () => {
    toast({
      title: "Create Quiz",
      description: "Opening quiz creation form...",
    });
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

  const handleDeleteQuiz = (quizId: number, title: string) => {
    toast({
      title: "Delete Quiz",
      description: `Are you sure you want to delete "${title}"?`,
      variant: "destructive",
    });
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
          {quizzes.map((quiz) => (
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
      </div>
    </AdminLayout>
  );
}
