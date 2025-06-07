
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { List, CheckCircle, Users, BarChart } from 'lucide-react';

export default function QuizzesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Quizzes</h1>
            <p className="text-amber-700">Manage quiz questions and assessments</p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">
            <List className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((quiz) => (
            <Card key={quiz} className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Quiz {quiz}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-amber-700">
                    <CheckCircle className="h-4 w-4" />
                    <span>20 questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-amber-700">
                    <Users className="h-4 w-4" />
                    <span>156 attempts</span>
                  </div>
                  <Button variant="outline" className="w-full border-amber-300 text-amber-700">
                    <BarChart className="h-4 w-4 mr-2" />
                    View Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
