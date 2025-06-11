
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
import { Book, Upload } from 'lucide-react';

interface CourseFormData {
  title: string;
  language: string;
  level: string;
  description: string;
  flag: string;
}

const languages = [
  { value: 'swahili', label: 'Swahili', flag: '🇹🇿' },
  { value: 'yoruba', label: 'Yoruba', flag: '🇳🇬' },
  { value: 'amharic', label: 'Amharic', flag: '🇪🇹' },
  { value: 'zulu', label: 'Zulu', flag: '🇿🇦' },
  { value: 'kinyarwanda', label: 'Kinyarwanda', flag: '🇷🇼' },
  { value: 'hausa', label: 'Hausa', flag: '🇳🇬' },
];

const levels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export default function CreateCoursePage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CourseFormData>({
    defaultValues: {
      title: '',
      language: '',
      level: '',
      description: '',
      flag: '',
    },
  });

  const onSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Course Created Successfully!",
      description: `"${data.title}" has been created and is ready for lessons.`,
    });
    
    setIsSubmitting(false);
    navigate('/admin/courses');
  };

  const selectedLanguage = languages.find(lang => lang.value === form.watch('language'));

  return (
    <FormLayout
      title="Create New Course"
      description="Set up a new language course for your students"
      backUrl="/admin/courses"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Course title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Swahili Basics" 
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
              name="language"
              rules={{ required: "Please select a language" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    const lang = languages.find(l => l.value === value);
                    if (lang) {
                      form.setValue('flag', lang.flag);
                    }
                  }}>
                    <FormControl>
                      <SelectTrigger className="border-amber-300 focus:border-amber-500">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          <div className="flex items-center gap-2">
                            <span>{language.flag}</span>
                            <span>{language.label}</span>
                          </div>
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
              name="level"
              rules={{ required: "Please select a level" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border-amber-300 focus:border-amber-500">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <div className="text-4xl">
                {selectedLanguage?.flag || '🌍'}
              </div>
              <div>
                <Label className="text-sm text-amber-600">Course Flag</Label>
                <p className="text-xs text-amber-500">Auto-selected based on language</p>
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Course description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Describe what students will learn in this course..."
                    className="flex min-h-[100px] w-full rounded-md border border-amber-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-6 border-t border-amber-200">
            <Button 
              type="button" 
              variant="outline" 
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={() => navigate('/admin/courses')}
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
                  <Book className="h-4 w-4 mr-2" />
                  Create Course
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
