import React from 'react';
import { FormLayout } from '@/components/admin/FormLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { quizService } from '@/services/quizService';
import { List, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ViewQuizPage() {
  const { id } = useParams<{ id: string }>();
  const quizId = parseInt(id || '0');

  const { data: quiz, isLoading, error } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => quizService.getById(quizId),
    enabled: !!quizId,
  });

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <FormLayout
        title="View Quiz"
        description="Quiz details and content"
        backUrl="/admin/quizzes"
      >
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-amber-700">Loading quiz...</p>
          </div>
        </div>
      </FormLayout>
    );
  }

  if (error || !quiz) {
    return (
      <FormLayout
        title="View Quiz"
        description="Quiz details and content"
        backUrl="/admin/quizzes"
      >
        <div className="text-center text-red-600 p-8">
          <p>Failed to load quiz. Please try again.</p>
        </div>
      </FormLayout>
    );
  }

  return (
    <FormLayout
      title={quiz.title}
      description="Quiz Preview"
      backUrl="/admin/quizzes"
    >
      <div className="space-y-6 w-full max-w-full overflow-x-auto">
        {/* Header Card */}
        <Card className="border-amber-200 w-full max-w-full min-w-0">
          <CardHeader>
            <div className="flex items-start justify-between min-w-0">
              <div className="flex items-center gap-3 min-w-0">
                <List className="h-8 w-8 text-amber-600" />
                <div className="min-w-0">
                  <CardTitle className="text-2xl text-amber-900 truncate min-w-0">{quiz.title}</CardTitle>
                  <p className="text-amber-600 truncate min-w-0">Lesson: {quiz.lesson.title}</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Quiz</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-amber-700 line-clamp-2 min-w-0">{quiz.description}</p>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={() => navigate(`/admin/quizzes/${quiz.id}/edit`)}
              >
                Edit Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Details */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-full min-w-0">
          <Card className="border-amber-200 w-full max-w-full min-w-0">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-lg">Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-amber-900">{quiz.questions?.length || 0}</p>
              <p className="text-sm text-amber-600">Total questions</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 w-full max-w-full min-w-0">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-lg">Minimum Passing Score</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-amber-900">{quiz.minPassingScore}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Questions Preview */}
        {quiz.questions && quiz.questions.length > 0 && (
          <Card className="border-amber-200 w-full max-w-full min-w-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5 text-amber-600" />
                Questions Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 min-w-0">
                {quiz.questions.map((question, index) => (
                  <div key={question.id} className="p-4 border border-amber-200 rounded-lg min-w-0">
                    <p className="font-medium text-amber-900 mb-2 truncate min-w-0">
                      {index + 1}. {question.questionText}
                    </p>
                    <div className="flex items-center justify-between text-sm text-amber-600 min-w-0">
                      <span>Type: {question.questionType}</span>
                      <span>Points: {question.points}</span>
                    </div>
                    {question.options && question.options.length > 0 && (
                      <div className="mt-2 space-y-1 min-w-0">
                        {question.options.map((option, optIndex) => (
                          <div key={option.id} className="text-sm text-amber-700 flex items-center gap-2 min-w-0">
                            <span className={`w-2 h-2 rounded-full ${option.correct ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                            {option.optionText}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lesson Information */}
        <Card className="border-amber-200 w-full max-w-full min-w-0">
          <CardHeader>
            <CardTitle>Associated Lesson</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl">📖</span>
              <div className="min-w-0">
                <p className="font-medium text-amber-800 truncate min-w-0">{quiz.lesson.title}</p>
                <p className="text-sm text-amber-600 truncate min-w-0">{quiz.lesson.description}</p>
                <p className="text-xs text-amber-500 truncate min-w-0">Course: {quiz.lesson.course.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormLayout>
  );
}
