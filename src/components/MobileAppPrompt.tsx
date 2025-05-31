
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Smartphone, Download, X, Apple, Play } from 'lucide-react';

interface MobileAppPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileAppPrompt = ({ isOpen, onClose }: MobileAppPromptProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-amber-900">
              Get the Mobile App!
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl flex items-center justify-center">
            <Smartphone className="h-10 w-10 text-amber-800" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">
              Continue Learning on Mobile
            </h3>
            <p className="text-amber-700">
              Take your African language journey anywhere with our mobile app. 
              Get offline access, daily reminders, and exclusive mobile features.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Download className="h-4 w-4" />
              <span>Offline learning & sync progress</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Download className="h-4 w-4" />
              <span>Daily practice reminders</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Download className="h-4 w-4" />
              <span>Enhanced voice recognition</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button 
              size="lg" 
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 w-full"
            >
              <Apple className="h-5 w-5 mr-2" />
              Download for iOS
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-800 text-amber-800 hover:bg-amber-100 w-full"
            >
              <Play className="h-5 w-5 mr-2" />
              Get on Android
            </Button>
          </div>

          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-amber-600 hover:text-amber-800"
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileAppPrompt;
