
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Trophy, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChallengeCard } from '@/components/admin/challenges/ChallengeCard';
import { ChallengeStats } from '@/components/admin/challenges/ChallengeStats';
import { SearchFilter } from '@/components/admin/shared/SearchFilter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { challengeService, Challenge } from '@/services/challengeService';
import { Link, useNavigate } from 'react-router-dom';

const ChallengesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  console.log('ChallengesPage: Component rendered');

  const { data: challenges = [], isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      console.log('ChallengesPage: Fetching challenges...');
      try {
        const result = await challengeService.getAll();
        console.log('ChallengesPage: Challenges fetched successfully:', result);
        return result;
      } catch (error) {
        console.error('ChallengesPage: Error fetching challenges:', error);
        throw error;
      }
    },
  });

  const handleCreateChallenge = () => {
    navigate('/admin/challenges/new');
  };

  const handleEditChallenge = (challengeId: number, title: string) => {
    toast({
      title: "Edit Challenge",
      description: `Editing "${title}" - Edit functionality coming soon`,
    });
  };

  const handleDeleteChallenge = async (challengeId: number, title: string) => {
    try {
      await challengeService.delete(challengeId);
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      toast({
        title: "Challenge Deleted",
        description: `"${title}" has been deleted successfully.`,
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: `Failed to delete "${title}". Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleViewChallenge = (challengeId: number, title: string) => {
    toast({
      title: "View Challenge",
      description: `Opening "${title}" preview - Preview functionality coming soon`,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Challenges",
      description: searchQuery ? `Searching for: "${searchQuery}"` : "Please enter a search term",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Challenges",
      description: "Opening filter options...",
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-amber-700">Loading challenges...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center text-red-600 p-8">
          <p>Failed to load challenges. Please try again.</p>
        </div>
      </AdminLayout>
    );
  }

  // Transform challenge data to match the expected format for ChallengeCard
  const transformedChallenges = challenges.map((challenge: Challenge) => ({
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    difficulty: challenge.difficulty,
    participants: 0, // Will need to fetch from statistics
    duration: challenge.timeLimit,
    reward: `${challenge.points} points`,
    status: "Active" // Default status
  }));

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

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          onFilter={handleFilter}
          placeholder="Search challenges..."
        />

        {/* Stats Cards */}
        <ChallengeStats />

        {/* Challenges List */}
        <div className="grid gap-6">
          {transformedChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onEdit={() => handleEditChallenge(challenge.id, challenge.title)}
              onDelete={() => handleDeleteChallenge(challenge.id, challenge.title)}
            />
          ))}
        </div>

        {challenges.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-amber-900 mb-2">No challenges yet</h3>
            <p className="text-amber-600 mb-6">Get started by creating your first challenge.</p>
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={handleCreateChallenge}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Challenge
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ChallengesPage;
