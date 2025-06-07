
import { Smartphone, Download, Apple, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MobileAppSection = () => {
  return (
    <section className="py-16 bg-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center p-1">
                <img 
                  src="/lovable-uploads/11afa540-f243-4c5a-93e4-f75f0daebf89.png" 
                  alt="Afrilingo Logo" 
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-50">
                Download Afrilingo App
              </h2>
            </div>
            
            <p className="text-lg text-amber-100 leading-relaxed">
              Take your African language learning journey anywhere with the Afrilingo mobile app. 
              Practice offline, get daily reminders, and immerse yourself in authentic conversations.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
                  <Download className="h-4 w-4 text-amber-100" />
                </div>
                <span className="text-amber-100">Offline learning capabilities</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
                  <Download className="h-4 w-4 text-amber-100" />
                </div>
                <span className="text-amber-100">Daily practice reminders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
                  <Download className="h-4 w-4 text-amber-100" />
                </div>
                <span className="text-amber-100">Native speaker audio library</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center gap-2"
              >
                <Apple className="h-5 w-5" />
                Download for iOS
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-amber-100 text-amber-100 hover:bg-amber-800 flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Get on Android
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 bg-amber-800/80 backdrop-blur shadow-2xl border-0">
              <CardContent className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-amber-100 rounded-3xl flex items-center justify-center p-4">
                  <img 
                    src="/lovable-uploads/11afa540-f243-4c5a-93e4-f75f0daebf89.png" 
                    alt="Afrilingo Logo" 
                    className="h-24 w-24 rounded-2xl object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-amber-50 mb-2">Afrilingo Mobile</h3>
                  <p className="text-amber-100">Learn African languages on the go</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-amber-700 rounded-lg p-3">
                    <div className="font-semibold text-amber-50">4.9★</div>
                    <div className="text-amber-100">App Store</div>
                  </div>
                  <div className="bg-amber-700 rounded-lg p-3">
                    <div className="font-semibold text-amber-50">50K+</div>
                    <div className="text-amber-100">Downloads</div>
                  </div>
                </div>
                
                <div className="text-xs text-amber-200">
                  Available for iOS 14+ and Android 8+
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
