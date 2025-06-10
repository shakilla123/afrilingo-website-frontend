
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Plus, Edit, Trash2, Users, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChallengesPage = () => {
  const { toast } = useToast();

  const challenges = [
    {
      id: 1,
      title: "Swahili Basics Challenge",
      description: "Complete 10 basic Swahili lessons in 7 days",
      difficulty: "Beginner",
      participants: 245,
      duration: "7 days",
      reward: "100 points",
      status: "Active"
    },
    {
      id: 2,
      title: "Yoruba Pronunciation Master",
      description: "Perfect your Yoruba pronunciation with daily exercises",
      difficulty: "Intermediate",
      participants: 89,
      duration: "14 days",
      reward: "250 points",
      status: "Active"
    },
    {
      id: 3,
      title: "Amharic Writing Sprint",
      description: "Learn to write 50 Amharic characters",
      difficulty: "Advanced",
      participants: 34,
      duration: "21 days",
      reward: "500 points",
      status: "Draft"
    }
  ];

  const handleCreateChallenge = () => {
    toast({
      title: "Create Challenge",
      description: "Challenge creation form coming soon!",
    });
  };

  const handleEditChallenge = (id: number) => {
    toast({
      title: "Edit Challenge",
      description: `Editing challenge ${id}...`,
    });
  };

  const handleDeleteChallenge = (id: number) => {
    toast({
      title: "Delete Challenge",
      description: `Challenge ${id} deleted successfully!`,
      variant: "destructive",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-amber-900 flex items-center gap-3">
              <Trophy className="h-8 w-8" />
              Challenges Management
            </h1>
            <p className="text-amber-700 mt-2">Create and manage learning challenges to motivate students</p>
          </div>
          <Button onClick={handleCreateChallenge} className="bg-amber-800 hover:bg-amber-900">
            <Plus className="h-4 w-4 mr-2" />
            Create Challenge
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Active Challenges</p>
                  <p className="text-2xl font-bold text-green-800">2</p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Participants</p>
                  <p className="text-2xl font-bold text-blue-800">368</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Completion Rate</p>
                  <p className="text-2xl font-bold text-purple-800">78%</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Avg Duration</p>
                  <p className="text-2xl font-bold text-orange-800">14 days</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challenges List */}
        <div className="grid gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-amber-900">{challenge.title}</CardTitle>
                    <CardDescription className="text-amber-700">{challenge.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditChallenge(challenge.id)}
                      className="border-amber-300 text-amber-700 hover:bg-amber-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteChallenge(challenge.id)}
                      className="border-red-300 text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 items-center">
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                  <Badge className={getStatusColor(challenge.status)}>
                    {challenge.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-amber-700">
                    <Users className="h-4 w-4" />
                    {challenge.participants} participants
                  </div>
                  <div className="flex items-center gap-1 text-sm text-amber-700">
                    <Clock className="h-4 w-4" />
                    {challenge.duration}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-amber-700">
                    <Trophy className="h-4 w-4" />
                    {challenge.reward}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChallengesPage;
