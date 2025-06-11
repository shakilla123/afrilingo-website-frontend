
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
import { BookOpen, Clock, Plus, Trash2 } from 'lucide-react';

interface LessonFormData {
  title: string;
  course: string;
  duration: string;
  description: string;
  vocabulary: string[];
  objectives: string[];
}

const courses = [
  { value: 'swahili-basics', label: 'Swahili Basics' },
  { value: 'yoruba-fundamentals', label: 'Yoruba Fundamentals' },
  { value: 'amharic-expressions', label: 'Amharic Expressions' },
  { value: 'zulu-conversations', label: 'Zulu Conversations' },
];

export default function CreateLessonPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vocabulary, setVocabulary] = useState<string[]>(['']);
  const [objectives, setObjectives] = useState<string[]>(['']);

  const form = useForm<LessonFormData>({
    defaultValues: {
      title: '',
      course: '',
      duration: '',
      description: '',
      vocabulary: [],
      objectives: [],
    },
  });

  const addVocabularyItem = () => {
    setVocabulary([...vocabulary, '']);
  };

  const removeVocabularyItem = (index: number) => {
    setVocabulary(vocabulary.filter((_, i) => i !== index));
  };

  const updateVocabularyItem = (index: number, value: string) => {
    const updated = [...vocabulary];
    updated[index] = value;
    setVocabulary(updated);
  };

  const addObjective = () => {
    setObjectives([...objectives, '']);
  };

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const updateObjective = (index: number, value: string) => {
    const updated = [...objectives];
    updated[index] = value;
    setObjectives(updated);
  };

  const onSubmit = async (data: LessonFormData) => {
    setIsSubmitting(true);
    
    const formData = {
      ...data,
      vocabulary: vocabulary.filter(item => item.trim() !== ''),
      objectives: objectives.filter(item => item.trim() !== ''),
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Lesson Created Successfully!",
      description: `"${data.title}" has been created and added to the course.`,
    });
    
    setIsSubmitting(false);
    navigate('/admin/lessons');
  };

  return (
    <FormLayout
      title="Create New Lesson"
      description="Design engaging lesson content for your students"
      backUrl="/admin/lessons"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Lesson title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Basic Greetings" 
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
              name="duration"
              rules={{ required: "Duration is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., 15 minutes" 
                      className="border-amber-300 focus:border-amber-500"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Lesson description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Describe what students will learn in this lesson..."
                    className="flex min-h-[100px] w-full rounded-md border border-amber-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Key Vocabulary</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={addVocabularyItem}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Word
              </Button>
            </div>
            {vocabulary.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Enter vocabulary word"
                  value={item}
                  onChange={(e) => updateVocabularyItem(index, e.target.value)}
                  className="border-amber-300 focus:border-amber-500"
                />
                {vocabulary.length > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                    onClick={() => removeVocabularyItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Learning Objectives</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={addObjective}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Objective
              </Button>
            </div>
            {objectives.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Enter learning objective"
                  value={item}
                  onChange={(e) => updateObjective(index, e.target.value)}
                  className="border-amber-300 focus:border-amber-500"
                />
                {objectives.length > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                    onClick={() => removeObjective(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-amber-200">
            <Button 
              type="button" 
              variant="outline" 
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => navigate('/admin/lessons')}
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
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create Lesson
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
