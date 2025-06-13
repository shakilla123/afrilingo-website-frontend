
import React from 'react';
import { FormLayout } from '@/components/admin/FormLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { lessonService } from '@/services/lessonService';
import { BookOpen, Clock, Hash, Type } from 'lucide-react';

export default function ViewLessonPage() {
  const { id } = useParams<{ id: string }>();
  const lessonId = parseInt(id || '0');

  const { data: lesson, isLoading, error } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => lessonService.getById(lessonId),
    enabled: !!lessonId,
  });

  if (isLoading) {
    return (
      <FormLayout
        title="View Lesson"
        description="Lesson details and content"
        backUrl="/admin/lessons"
      >
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-amber-700">Loading lesson...</p>
          </div>
        </div>
      </FormLayout>
    );
  }

  if (error || !lesson) {
    return (
      <FormLayout
        title="View Lesson"
        description="Lesson details and content"
        backUrl="/admin/lessons"
      >
        <div className="text-center text-red-600 p-8">
          <p>Failed to load lesson. Please try again.</p>
        </div>
      </FormLayout>
    );
  }

  const getLessonTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return '🎥';
      case 'audio': return '🎵';
      case 'text': return '📖';
      case 'interactive': return '🎯';
      default: return '📚';
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      case 'text': return 'bg-green-100 text-green-800';
      case 'interactive': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <FormLayout
      title={lesson.title}
      description="Lesson Preview"
      backUrl="/admin/lessons"
    >
      <div className="space-y-6">
        {/* Header Card */}
        <Card className="border-amber-200">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getLessonTypeIcon(lesson.lessonType)}</span>
                <div>
                  <CardTitle className="text-2xl text-amber-900">{lesson.title}</CardTitle>
                  <p className="text-amber-600">Course: {lesson.course.title}</p>
                </div>
              </div>
              <Badge className={getLessonTypeColor(lesson.lessonType)}>
                {lesson.lessonType}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-amber-700">{lesson.description}</p>
          </CardContent>
        </Card>

        {/* Lesson Details */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-amber-200">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-lg">Order</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-amber-900">{lesson.orderIndex}</p>
              <p className="text-sm text-amber-600">Lesson order</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-lg">Duration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-amber-900">{lesson.duration}</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Type className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-lg">Type</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Badge className={getLessonTypeColor(lesson.lessonType)} variant="outline">
                {lesson.lessonType}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Lesson Content */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-600" />
              Lesson Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-amber max-w-none">
              <div className="whitespace-pre-wrap text-amber-700">{lesson.content}</div>
            </div>
          </CardContent>
        </Card>

        {/* Course Information */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle>Associated Course</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <p className="font-medium text-amber-800">{lesson.course.title}</p>
                <p className="text-sm text-amber-600">{lesson.course.description}</p>
                <p className="text-xs text-amber-500">
                  {lesson.course.language.name} • {lesson.course.level}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormLayout>
  );
}
