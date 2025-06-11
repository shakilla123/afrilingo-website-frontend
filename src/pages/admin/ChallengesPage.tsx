
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Trophy, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChallengeCard } from '@/components/admin/challenges/ChallengeCard';
import { ChallengeStats } from '@/components/admin/challenges/ChallengeStats';

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
        <ChallengeStats />

        {/* Challenges List */}
        <div className="grid gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onEdit={handleEditChallenge}
              onDelete={handleDeleteChallenge}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ChallengesPage;
