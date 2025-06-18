
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { FormLayout } from '@/components/admin/FormLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { questionService, CreateQuestionRequest } from '@/services/questionService';

interface QuestionOption {
  optionText: string;
  optionMedia?: string;
  correct: boolean;
}

export default function CreateQuestionPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<CreateQuestionRequest>({
    questionText: '',
    questionType: 'MULTIPLE_CHOICE',
    mediaUrl: '',
    points: 1,
    options: []
  });

  const [options, setOptions] = useState<QuestionOption[]>([
    { optionText: '', optionMedia: '', correct: false },
    { optionText: '', optionMedia: '', correct: false }
  ]);

  const handleInputChange = (field: keyof CreateQuestionRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (index: number, field: keyof QuestionOption, value: any) => {
    setOptions(prev => prev.map((option, i) => 
      i === index ? { ...option, [field]: value } : option
    ));
  };

  const addOption = () => {
    setOptions(prev => [...prev, { optionText: '', optionMedia: '', correct: false }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleCorrectChange = (index: number, isCorrect: boolean) => {
    if (formData.questionType === 'TRUE_FALSE' || formData.questionType === 'MULTIPLE_CHOICE') {
      // For TRUE_FALSE, only allow one correct answer
      // For MULTIPLE_CHOICE, allow multiple correct answers
      if (formData.questionType === 'TRUE_FALSE') {
        setOptions(prev => prev.map((option, i) => ({
          ...option,
          correct: i === index ? isCorrect : false
        })));
      } else {
        handleOptionChange(index, 'correct', isCorrect);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate that at least one option is correct for MULTIPLE_CHOICE and TRUE_FALSE
      if (formData.questionType !== 'FILL_BLANK') {
        const hasCorrectAnswer = options.some(option => option.correct && option.optionText.trim());
        if (!hasCorrectAnswer) {
          toast({
            title: "Validation Error",
            description: "Please mark at least one option as correct.",
            variant: "destructive",
          });
          return;
        }
      }

      // Filter out empty options
      const validOptions = options.filter(option => option.optionText.trim());
      
      const questionData: CreateQuestionRequest = {
        ...formData,
        options: formData.questionType === 'FILL_BLANK' ? [] : validOptions
      };

      await questionService.create(questionData);
      
      toast({
        title: "Question Created",
        description: "The question has been created successfully.",
      });
      
      navigate('/admin/questions');
    } catch (error) {
      console.error('Create question error:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Adjust options based on question type
  React.useEffect(() => {
    if (formData.questionType === 'TRUE_FALSE') {
      setOptions([
        { optionText: 'True', optionMedia: '', correct: false },
        { optionText: 'False', optionMedia: '', correct: false }
      ]);
    } else if (formData.questionType === 'FILL_BLANK') {
      setOptions([]);
    } else if (formData.questionType === 'MULTIPLE_CHOICE' && options.length < 2) {
      setOptions([
        { optionText: '', optionMedia: '', correct: false },
        { optionText: '', optionMedia: '', correct: false }
      ]);
    }
  }, [formData.questionType]);

  return (
    <AdminLayout>
      <FormLayout
        title="Create Question"
        description="Add a new question to your quiz bank"
        onBack={() => navigate('/admin/questions')}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900">Question Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="questionText">Question Text</Label>
                <Textarea
                  id="questionText"
                  placeholder="Enter your question..."
                  value={formData.questionText}
                  onChange={(e) => handleInputChange('questionText', e.target.value)}
                  className="border-amber-300 focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="questionType">Question Type</Label>
                  <Select 
                    value={formData.questionType} 
                    onValueChange={(value) => handleInputChange('questionType', value)}
                  >
                    <SelectTrigger className="border-amber-300 focus:border-amber-500">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
                      <SelectItem value="TRUE_FALSE">True/False</SelectItem>
                      <SelectItem value="FILL_BLANK">Fill in the Blank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    min="1"
                    placeholder="Enter points"
                    value={formData.points}
                    onChange={(e) => handleInputChange('points', parseInt(e.target.value) || 1)}
                    className="border-amber-300 focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mediaUrl">Media URL (Optional)</Label>
                <Input
                  id="mediaUrl"
                  type="url"
                  placeholder="Enter media URL..."
                  value={formData.mediaUrl}
                  onChange={(e) => handleInputChange('mediaUrl', e.target.value)}
                  className="border-amber-300 focus:border-amber-500"
                />
              </div>
            </CardContent>
          </Card>

          {formData.questionType !== 'FILL_BLANK' && (
            <Card className="border-amber-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-amber-900">Answer Options</CardTitle>
                  {formData.questionType === 'MULTIPLE_CHOICE' && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addOption}
                      className="border-amber-300 text-amber-700 hover:bg-amber-100"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-amber-200 rounded-lg">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option.optionText}
                        onChange={(e) => handleOptionChange(index, 'optionText', e.target.value)}
                        className="border-amber-300 focus:border-amber-500"
                        required
                        disabled={formData.questionType === 'TRUE_FALSE'}
                      />
                      <Input
                        placeholder="Media URL (optional)"
                        value={option.optionMedia}
                        onChange={(e) => handleOptionChange(index, 'optionMedia', e.target.value)}
                        className="border-amber-300 focus:border-amber-500"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={option.correct}
                        onCheckedChange={(checked) => handleCorrectChange(index, checked)}
                      />
                      <Label className="text-sm">Correct</Label>
                    </div>

                    {formData.questionType === 'MULTIPLE_CHOICE' && options.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(index)}
                        className="border-red-300 text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/questions')}
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isLoading ? 'Creating...' : 'Create Question'}
            </Button>
          </div>
        </form>
      </FormLayout>
    </AdminLayout>
  );
}
