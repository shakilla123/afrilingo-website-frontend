
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Plus, Eye, Edit, Trash2, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SearchFilter } from '@/components/admin/shared/SearchFilter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { challengeService, Challenge } from '@/services/challengeService';
import { useNavigate } from 'react-router-dom';

const ChallengesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  console.log('ChallengesPage: Component rendered');

  const { data: challengesData, isLoading, error } = useQuery({
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

  // Debug logging and ensure we have an array
  console.log('Raw challenges data:', challengesData);
  console.log('Type of challengesData:', typeof challengesData);
  console.log('Is array:', Array.isArray(challengesData));

  // Ensure we always have an array to work with
  const challenges = Array.isArray(challengesData) ? challengesData : [];

  const handleCreateChallenge = () => {
    navigate('/admin/challenges/new');
  };

  const handleViewChallenge = (challengeId: number) => {
    navigate(`/admin/challenges/${challengeId}/view`);
  };

  const handleEditChallenge = (challengeId: number) => {
    navigate(`/admin/challenges/${challengeId}/edit`);
  };

  const handleDeleteChallenge = async (challengeId: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        await challengeService.delete(challengeId);
        queryClient.invalidateQueries({ queryKey: ['challenges'] });
        toast({
          title: "Challenge Deleted",
          description: `"${title}" has been deleted successfully.`,
        });
        window.location.reload();
      } catch (error) {
        console.error('Delete challenge error:', error);
        toast({
          title: "Delete Failed",
          description: `Failed to delete "${title}". Please try again.`,
          variant: "destructive",
        });
      }
    }
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

  // Filter challenges based on search query - now safe because challenges is guaranteed to be an array
  const filteredChallenges = challenges.filter((challenge: Challenge) => {
    if (!searchQuery) return true;
    return challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           challenge.course.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Challenges</h1>
            <p className="text-amber-700">Manage learning challenges and assessments</p>
          </div>
          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleCreateChallenge}
          >
            <Trophy className="h-4 w-4 mr-2" />
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge: Challenge) => (
            <Card key={challenge.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg text-amber-900 truncate">{challenge.title}</CardTitle>
                      <p className="text-sm text-amber-600">Course: {challenge.course.title}</p>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(challenge.difficulty || 'medium')}>
                    {challenge.difficulty || 'Challenge'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-amber-700 line-clamp-2">{challenge.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-amber-900">
                        {challenge.questions?.length || 0}
                      </div>
                      <div className="text-xs text-amber-600">Questions</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-amber-900 flex items-center justify-center gap-1">
                        <Target className="h-4 w-4" />
                        {challenge.minPassingScore || 70}%
                      </div>
                      <div className="text-xs text-amber-600">Min Score</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleViewChallenge(challenge.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleEditChallenge(challenge.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-300 text-red-700 hover:bg-red-100"
                      onClick={() => handleDeleteChallenge(challenge.id, challenge.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChallenges.length === 0 && challenges.length > 0 && (
          <div className="text-center py-12">
            <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-amber-900 mb-2">No challenges found</h3>
            <p className="text-amber-600 mb-6">Try adjusting your search terms.</p>
          </div>
        )}

        {challenges.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-amber-900 mb-2">No challenges yet</h3>
            <p className="text-amber-600 mb-6">Get started by creating your first challenge.</p>
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={handleCreateChallenge}
            >
              <Trophy className="h-4 w-4 mr-2" />
              Create Challenge
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ChallengesPage;
