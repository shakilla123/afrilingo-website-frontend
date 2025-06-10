
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { List, CheckCircle, Users, BarChart, Edit, Trash2, Search, Filter, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

        {/* Search and Filters */}
        <Card className="border-amber-200">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
                <Input 
                  placeholder="Search quizzes..." 
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
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-amber-900 flex-1 min-w-0">
                    <span className="truncate">{quiz.title}</span>
                  </CardTitle>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                    quiz.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {quiz.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-amber-900">{quiz.questions}</div>
                      <div className="text-xs text-amber-600">Questions</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-amber-900">{quiz.attempts}</div>
                      <div className="text-xs text-amber-600">Attempts</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-900">{quiz.avgScore}%</div>
                    <div className="text-xs text-amber-600">Average Score</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleViewQuiz(quiz.id, quiz.title)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleViewResults(quiz.id, quiz.title)}
                    >
                      <BarChart className="h-4 w-4 mr-2" />
                      Results
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleEditQuiz(quiz.id, quiz.title)}
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
      </div>
    </AdminLayout>
  );
}
