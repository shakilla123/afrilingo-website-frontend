
import { Smartphone, Download, Apple, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MobileAppSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-amber-50" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
                Download Afrilingo App
              </h2>
            </div>
            
            <p className="text-lg text-amber-800 leading-relaxed">
              Take your African language learning journey anywhere with the Afrilingo mobile app. 
              Practice offline, get daily reminders, and immerse yourself in authentic conversations.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <Download className="h-4 w-4 text-amber-800" />
                </div>
                <span className="text-amber-800">Offline learning capabilities</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <Download className="h-4 w-4 text-amber-800" />
                </div>
                <span className="text-amber-800">Daily practice reminders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <Download className="h-4 w-4 text-amber-800" />
                </div>
                <span className="text-amber-800">Native speaker audio library</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-amber-800 hover:bg-amber-900 text-amber-50 flex items-center gap-2"
              >
                <Apple className="h-5 w-5" />
                Download for iOS
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-amber-800 text-amber-800 hover:bg-amber-100 flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Get on Android
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 bg-white/80 backdrop-blur shadow-2xl border-0">
              <CardContent className="text-center space-y-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-200 to-amber-300 rounded-3xl flex items-center justify-center">
                  <Smartphone className="h-16 w-16 text-amber-800" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">Afrilingo Mobile</h3>
                  <p className="text-amber-700">Learn African languages on the go</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-amber-100 rounded-lg p-3">
                    <div className="font-semibold text-amber-900">4.9★</div>
                    <div className="text-amber-700">App Store</div>
                  </div>
                  <div className="bg-amber-100 rounded-lg p-3">
                    <div className="font-semibold text-amber-900">50K+</div>
                    <div className="text-amber-700">Downloads</div>
                  </div>
                </div>
                
                <div className="text-xs text-amber-600">
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
