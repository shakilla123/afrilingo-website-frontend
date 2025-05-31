import { Users, BookOpen, Facebook, Twitter, Instagram, Youtube, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthDialog from './AuthDialog';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-amber-900 leading-tight">
                Learn <span className="text-amber-900">African</span> Languages with <span className="text-amber-900">Afrilingo</span>
              </h1>
              <p className="text-xl text-amber-800 leading-relaxed">
                Discover the rich diversity of African languages through interactive lessons, cultural insights, and native speaker guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <AuthDialog>
                <Button size="lg" className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-8 py-4 text-lg">
                  Start Learning Free
                </Button>
              </AuthDialog>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <span className="text-amber-700 font-medium">Follow us:</span>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
                    <Youtube className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-sm text-amber-700">50K+ learners</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-amber-700 ml-1">4.9/5 rating</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Card className="p-6 bg-white shadow-2xl border-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900">Kinyarwanda Basics</h3>
                      <p className="text-sm text-amber-700">Lesson 1: Greetings</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-800">Progress</span>
                      <span className="text-amber-700 font-medium">75%</span>
                    </div>
                    <div className="w-full bg-amber-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-amber-600 to-orange-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-amber-100">
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      <Users className="h-4 w-4" />
                      <span>Learning with 1,234 others</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-3xl transform -rotate-2 scale-110 opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
