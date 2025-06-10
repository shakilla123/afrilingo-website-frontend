
import React, { useState } from 'react';
import { Trophy, Plus, Edit, Trash2, Clock, Users, Star, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  timeLimit: number;
  participants: number;
  status: 'Active' | 'Upcoming' | 'Completed';
  category: string;
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Kinyarwanda Pronunciation Challenge',
    description: 'Master the pronunciation of 50 common Kinyarwanda words',
    difficulty: 'Beginner',
    points: 100,
    timeLimit: 30,
    participants: 245,
    status: 'Active',
    category: 'Pronunciation'
  },
  {
    id: '2',
    title: 'Cultural Context Quiz',
    description: 'Test your knowledge of Rwandan cultural contexts and traditions',
    difficulty: 'Intermediate',
    points: 200,
    timeLimit: 45,
    participants: 156,
    status: 'Active',
    category: 'Culture'
  },
  {
    id: '3',
    title: 'Advanced Grammar Marathon',
    description: 'Complete complex grammar exercises in record time',
    difficulty: 'Advanced',
    points: 300,
    timeLimit: 60,
    participants: 89,
    status: 'Upcoming',
    category: 'Grammar'
  }
];

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Beginner' as Challenge['difficulty'],
    points: 100,
    timeLimit: 30,
    category: ''
  });

  const handleCreateChallenge = () => {
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      ...formData,
      participants: 0,
      status: 'Upcoming' as Challenge['status']
    };
    
    setChallenges([...challenges, newChallenge]);
    setFormData({
      title: '',
      description: '',
      difficulty: 'Beginner',
      points: 100,
      timeLimit: 30,
      category: ''
    });
    setShowCreateForm(false);
    
    toast({
      title: "Challenge Created",
      description: "New challenge has been successfully created!",
    });
  };

  const handleDeleteChallenge = (id: string) => {
    setChallenges(challenges.filter(c => c.id !== id));
    toast({
      title: "Challenge Deleted",
      description: "Challenge has been removed successfully.",
      variant: "destructive",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Upcoming': return 'text-blue-600 bg-blue-100';
      case 'Completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-amber-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              Challenge Management
            </h1>
            <p className="text-amber-700 mt-2">Create and manage interactive language challenges</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Challenge
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-200 rounded-lg">
                  <Trophy className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm text-amber-600">Total Challenges</p>
                  <p className="text-2xl font-bold text-amber-900">{challenges.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-200 rounded-lg">
                  <Users className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-green-600">Active Participants</p>
                  <p className="text-2xl font-bold text-green-900">
                    {challenges.reduce((acc, c) => acc + c.participants, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-blue-600">Active Challenges</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {challenges.filter(c => c.status === 'Active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-200 rounded-lg">
                  <Gift className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm text-purple-600">Total Rewards</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {challenges.reduce((acc, c) => acc + c.points, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Challenge Form */}
        {showCreateForm && (
          <Card className="border-amber-200 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-amber-900">Create New Challenge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-amber-900">Challenge Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter challenge title"
                    className="border-amber-300 focus:border-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-amber-900">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g., Grammar, Vocabulary, Culture"
                    className="border-amber-300 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-amber-900">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the challenge objectives and requirements"
                  className="border-amber-300 focus:border-amber-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="difficulty" className="text-amber-900">Difficulty</Label>
                  <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value as Challenge['difficulty']})}
                    className="w-full h-10 px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="points" className="text-amber-900">Points Reward</Label>
                  <Input
                    id="points"
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({...formData, points: parseInt(e.target.value)})}
                    className="border-amber-300 focus:border-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="timeLimit" className="text-amber-900">Time Limit (minutes)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({...formData, timeLimit: parseInt(e.target.value)})}
                    className="border-amber-300 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleCreateChallenge}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                >
                  Create Challenge
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                  className="border-amber-300 text-amber-700"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Challenges List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="border-amber-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-amber-900 mb-2">{challenge.title}</CardTitle>
                    <p className="text-sm text-amber-700">{challenge.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="border-amber-300 text-amber-700 h-8 w-8"
                      onClick={() => setEditingChallenge(challenge)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="border-red-300 text-red-700 h-8 w-8"
                      onClick={() => handleDeleteChallenge(challenge.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
                    {challenge.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-amber-700">{challenge.points} points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-amber-700">{challenge.timeLimit}min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-amber-700">{challenge.participants} joined</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-orange-500" />
                    <span className="text-amber-700">{challenge.category}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                  onClick={() => toast({
                    title: "Challenge Preview",
                    description: `Viewing ${challenge.title} details...`,
                  })}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
