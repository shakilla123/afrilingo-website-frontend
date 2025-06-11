
import React, { useState } from 'react';
import { FormLayout } from '@/components/admin/FormLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { List, Plus, Trash2, CheckCircle } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizFormData {
  title: string;
  course: string;
  lesson: string;
  timeLimit: string;
  description: string;
}

const courses = [
  { value: 'swahili-basics', label: 'Swahili Basics' },
  { value: 'yoruba-fundamentals', label: 'Yoruba Fundamentals' },
  { value: 'amharic-expressions', label: 'Amharic Expressions' },
  { value: 'zulu-conversations', label: 'Zulu Conversations' },
];

const lessons = [
  { value: 'basic-greetings', label: 'Basic Greetings', course: 'swahili-basics' },
  { value: 'family-members', label: 'Family Members', course: 'swahili-basics' },
  { value: 'numbers-1-10', label: 'Numbers 1-10', course: 'swahili-basics' },
];

export default function CreateQuizPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  const form = useForm<QuizFormData>({
    defaultValues: {
      title: '',
      course: '',
      lesson: '',
      timeLimit: '',
      description: '',
    },
  });

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === 'question') {
      updated[index].question = value;
    } else if (field === 'correctAnswer') {
      updated[index].correctAnswer = value;
    }
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const selectedCourse = form.watch('course');
  const filteredLessons = lessons.filter(lesson => lesson.course === selectedCourse);

  const onSubmit = async (data: QuizFormData) => {
    setIsSubmitting(true);
    
    const formData = {
      ...data,
      questions: questions.filter(q => q.question.trim() !== ''),
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Quiz Created Successfully!",
      description: `"${data.title}" has been created with ${formData.questions.length} questions.`,
    });
    
    setIsSubmitting(false);
    navigate('/admin/quizzes');
  };

  return (
    <FormLayout
      title="Create New Quiz"
      description="Build interactive quizzes to test student knowledge"
      backUrl="/admin/quizzes"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Quiz title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Greetings Quiz" 
                      className="border-amber-300 focus:border-amber-500"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeLimit"
              rules={{ required: "Time limit is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Limit</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., 10 minutes" 
                      className="border-amber-300 focus:border-amber-500"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="course"
              rules={{ required: "Please select a course" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border-amber-300 focus:border-amber-500">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.value} value={course.value}>
                          {course.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lesson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} disabled={!selectedCourse}>
                    <FormControl>
                      <SelectTrigger className="border-amber-300 focus:border-amber-500">
                        <SelectValue placeholder="Select lesson" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredLessons.map((lesson) => (
                        <SelectItem key={lesson.value} value={lesson.value}>
                          {lesson.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Quiz description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiz Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Describe what this quiz covers..."
                    className="flex min-h-[100px] w-full rounded-md border border-amber-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Questions</Label>
              <Button 
                type="button" 
                variant="outline" 
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={addQuestion}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="border border-amber-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="font-medium">Question {questionIndex + 1}</Label>
                  {questions.length > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="border-red-300 text-red-700 hover:bg-red-100"
                      onClick={() => removeQuestion(questionIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <Input
                  placeholder="Enter your question"
                  value={question.question}
                  onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                  className="border-amber-300 focus:border-amber-500"
                />

                <div className="grid md:grid-cols-2 gap-3">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <button
                        type="button"
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          question.correctAnswer === optionIndex
                            ? 'border-green-500 bg-green-100'
                            : 'border-amber-300'
                        }`}
                        onClick={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                      >
                        {question.correctAnswer === optionIndex && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </button>
                      <Input
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                        className="border-amber-300 focus:border-amber-500"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-amber-600">Click the circle next to the correct answer</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-amber-200">
            <Button 
              type="button" 
              variant="outline" 
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => navigate('/admin/quizzes')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Creating...</>
              ) : (
                <>
                  <List className="h-4 w-4 mr-2" />
                  Create Quiz
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
