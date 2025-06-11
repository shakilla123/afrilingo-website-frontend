
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
import { Trophy, Plus, Trash2, Star } from 'lucide-react';

interface ChallengeFormData {
  title: string;
  course: string;
  difficulty: string;
  points: string;
  timeLimit: string;
  description: string;
  requirements: string[];
  rewards: string[];
}

const courses = [
  { value: 'swahili-basics', label: 'Swahili Basics' },
  { value: 'yoruba-fundamentals', label: 'Yoruba Fundamentals' },
  { value: 'amharic-expressions', label: 'Amharic Expressions' },
  { value: 'zulu-conversations', label: 'Zulu Conversations' },
];

const difficulties = [
  { value: 'easy', label: 'Easy', color: 'text-green-600' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { value: 'hard', label: 'Hard', color: 'text-red-600' },
];

export default function CreateChallengePage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [rewards, setRewards] = useState<string[]>(['']);

  const form = useForm<ChallengeFormData>({
    defaultValues: {
      title: '',
      course: '',
      difficulty: '',
      points: '',
      timeLimit: '',
      description: '',
      requirements: [],
      rewards: [],
    },
  });

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const addReward = () => {
    setRewards([...rewards, '']);
  };

  const removeReward = (index: number) => {
    setRewards(rewards.filter((_, i) => i !== index));
  };

  const updateReward = (index: number, value: string) => {
    const updated = [...rewards];
    updated[index] = value;
    setRewards(updated);
  };

  const onSubmit = async (data: ChallengeFormData) => {
    setIsSubmitting(true);
    
    const formData = {
      ...data,
      requirements: requirements.filter(item => item.trim() !== ''),
      rewards: rewards.filter(item => item.trim() !== ''),
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Challenge Created Successfully!",
      description: `"${data.title}" is now available for students to attempt.`,
    });
    
    setIsSubmitting(false);
    navigate('/admin/challenges');
  };

  return (
    <FormLayout
      title="Create New Challenge"
      description="Design exciting challenges to motivate your students"
      backUrl="/admin/challenges"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Challenge title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Conversation Master" 
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
              name="difficulty"
              rules={{ required: "Please select difficulty" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border-amber-300 focus:border-amber-500">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty.value} value={difficulty.value}>
                          <span className={difficulty.color}>{difficulty.label}</span>
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
              name="points"
              rules={{ required: "Points value is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points Reward</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., 100" 
                      type="number"
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
                      placeholder="e.g., 30 minutes" 
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
            rules={{ required: "Challenge description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Challenge Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Describe the challenge and what students need to accomplish..."
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
              <Label>Requirements</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={addRequirement}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </div>
            {requirements.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="e.g., Complete 3 lessons in Greetings"
                  value={item}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  className="border-amber-300 focus:border-amber-500"
                />
                {requirements.length > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                    onClick={() => removeRequirement(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Rewards</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={addReward}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Reward
              </Button>
            </div>
            {rewards.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="e.g., Conversation Master Badge"
                  value={item}
                  onChange={(e) => updateReward(index, e.target.value)}
                  className="border-amber-300 focus:border-amber-500"
                />
                {rewards.length > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                    onClick={() => removeReward(index)}
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
              onClick={() => navigate('/admin/challenges')}
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
                  <Trophy className="h-4 w-4 mr-2" />
                  Create Challenge
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormLayout>
  );
}
