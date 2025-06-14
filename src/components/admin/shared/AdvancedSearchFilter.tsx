
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface FilterOption {
  value: string;
  label: string;
}

interface AdvancedSearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  placeholder?: string;
  showFilters?: boolean;
  filterOptions?: {
    status?: FilterOption[];
    category?: FilterOption[];
    difficulty?: FilterOption[];
    dateRange?: boolean;
  };
  activeFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onClearFilters?: () => void;
}

export function AdvancedSearchFilter({ 
  searchQuery, 
  onSearchChange, 
  onSearch, 
  placeholder = "Search...",
  showFilters = true,
  filterOptions = {},
  activeFilters = {},
  onFilterChange = () => {},
  onClearFilters = () => {}
}: AdvancedSearchFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasActiveFilters = Object.values(activeFilters).some(value => value && value !== '');

  return (
    <Card className="border-amber-200">
      <CardContent className="p-6">
        <form onSubmit={onSearch} className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
              <Input 
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
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
            {showFilters && (
              <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleTrigger asChild>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <div className="ml-2 w-2 h-2 bg-amber-500 rounded-full"></div>
                    )}
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            )}
          </div>

          {showFilters && (
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <CollapsibleContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-amber-50/50 rounded-lg border border-amber-200">
                  {filterOptions.status && (
                    <div className="space-y-2">
                      <Label htmlFor="status-filter" className="text-amber-800">Status</Label>
                      <Select 
                        value={activeFilters.status || ''} 
                        onValueChange={(value) => onFilterChange('status', value)}
                      >
                        <SelectTrigger className="border-amber-300">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-amber-200 z-50">
                          <SelectItem value="">All Status</SelectItem>
                          {filterOptions.status.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {filterOptions.category && (
                    <div className="space-y-2">
                      <Label htmlFor="category-filter" className="text-amber-800">Category</Label>
                      <Select 
                        value={activeFilters.category || ''} 
                        onValueChange={(value) => onFilterChange('category', value)}
                      >
                        <SelectTrigger className="border-amber-300">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-amber-200 z-50">
                          <SelectItem value="">All Categories</SelectItem>
                          {filterOptions.category.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {filterOptions.difficulty && (
                    <div className="space-y-2">
                      <Label htmlFor="difficulty-filter" className="text-amber-800">Difficulty</Label>
                      <Select 
                        value={activeFilters.difficulty || ''} 
                        onValueChange={(value) => onFilterChange('difficulty', value)}
                      >
                        <SelectTrigger className="border-amber-300">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-amber-200 z-50">
                          <SelectItem value="">All Levels</SelectItem>
                          {filterOptions.difficulty.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-end">
                    {hasActiveFilters && (
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={onClearFilters}
                        className="border-red-300 text-red-700 hover:bg-red-100"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
