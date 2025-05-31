
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AuthDialog from './AuthDialog';
import MobileAppPrompt from './MobileAppPrompt';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobilePrompt, setShowMobilePrompt] = useState(false);

  const handleAuthSuccess = () => {
    // Show mobile app prompt after successful login
    setTimeout(() => {
      setShowMobilePrompt(true);
    }, 2000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-amber-50 shadow-sm border-b border-amber-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/11afa540-f243-4c5a-93e4-f75f0daebf89.png" 
                alt="Afrilingo Logo" 
                className="h-8 w-8 rounded-full"
              />
              <span className="text-2xl font-bold text-amber-900">Afrilingo</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('courses')}
                className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
              >
                Courses
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
              >
                Contact
              </button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <AuthDialog onSuccess={handleAuthSuccess}>
                <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
                  Sign In
                </Button>
              </AuthDialog>
              <AuthDialog onSuccess={handleAuthSuccess}>
                <Button className="bg-amber-800 hover:bg-amber-900 text-amber-50">
                  Get Started
                </Button>
              </AuthDialog>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-amber-200">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('courses')}
                  className="text-amber-700 hover:text-amber-900 font-medium text-left"
                >
                  Courses
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-amber-700 hover:text-amber-900 font-medium text-left"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-amber-700 hover:text-amber-900 font-medium text-left"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-amber-700 hover:text-amber-900 font-medium text-left"
                >
                  Contact
                </button>
                <div className="flex flex-col space-y-2 pt-4">
                  <AuthDialog onSuccess={handleAuthSuccess}>
                    <Button variant="outline" className="border-amber-600 text-amber-700">
                      Sign In
                    </Button>
                  </AuthDialog>
                  <AuthDialog onSuccess={handleAuthSuccess}>
                    <Button className="bg-amber-800 hover:bg-amber-900 text-amber-50">
                      Get Started
                    </Button>
                  </AuthDialog>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <MobileAppPrompt 
        isOpen={showMobilePrompt} 
        onClose={() => setShowMobilePrompt(false)} 
      />
    </>
  );
};

export default Header;
