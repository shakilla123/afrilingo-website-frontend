
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { languageService, Language } from '@/services/languageService';

export default function LanguagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: languages = [], isLoading, error } = useQuery({
    queryKey: ['languages'],
    queryFn: languageService.getAll,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Languages",
      description: searchQuery ? `Searching for: "${searchQuery}"` : "Please enter a search term",
    });
  };

  const handleEditLanguage = (languageId: number) => {
    navigate(`/admin/languages/${languageId}/edit`);
  };

  const handleDeleteLanguage = async (languageId: number, name: string) => {
    try {
      await languageService.delete(languageId);
      queryClient.invalidateQueries({ queryKey: ['languages'] });
      toast({
        title: "Language Deleted",
        description: `"${name}" has been deleted successfully.`,
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: `Failed to delete "${name}". Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleViewLanguage = (languageId: number) => {
    navigate(`/admin/languages/${languageId}/view`);
  };

  const handleFilter = () => {
    toast({
      title: "Filter Languages",
      description: "Opening filter options...",
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-amber-700">Loading languages...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center text-red-600 p-8">
          <p>Failed to load languages. Please try again.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Languages</h1>
            <p className="text-amber-700">Manage your platform languages</p>
          </div>
          <Link to="/admin/languages/new">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="border-amber-200">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
                <Input 
                  placeholder="Search languages..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-amber-300 focus:border-amber-500"
                />
              </div>
              <Button 
                type="submit"
                variant="outline" 
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                Search
              </Button>
              <Button 
                type="button"
                variant="outline" 
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={handleFilter}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Languages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language: Language) => (
            <Card key={language.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🌍</div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg text-amber-900 truncate">{language.name}</CardTitle>
                      <p className="text-sm text-amber-600">{language.code.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-amber-700 line-clamp-2">{language.description}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleViewLanguage(language.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                      onClick={() => handleEditLanguage(language.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-300 text-red-700 hover:bg-red-100"
                      onClick={() => handleDeleteLanguage(language.id, language.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {languages.length === 0 && (
          <div className="text-center py-12">
            <div className="h-12 w-12 text-amber-400 mx-auto mb-4">🌍</div>
            <h3 className="text-lg font-medium text-amber-900 mb-2">No languages yet</h3>
            <p className="text-amber-600 mb-6">Get started by adding your first language.</p>
            <Link to="/admin/languages/new">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
