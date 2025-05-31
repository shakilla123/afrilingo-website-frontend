
import { Play, Star, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Learn <span className="text-orange-500">African</span> Languages with <span className="text-red-500">Afrilingo</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover the rich diversity of African languages through interactive lessons, cultural insights, and native speaker guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                Start Learning Free
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 px-8 py-4 text-lg flex items-center gap-2">
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">50K+ learners</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 ml-1">4.9/5 rating</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Card className="p-6 bg-white shadow-2xl border-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Swahili Basics</h3>
                      <p className="text-sm text-gray-600">Lesson 1: Greetings</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Progress</span>
                      <span className="text-orange-600 font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Learning with 1,234 others</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-red-200 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl transform -rotate-2 scale-110 opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
