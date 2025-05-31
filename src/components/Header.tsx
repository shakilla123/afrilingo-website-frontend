
import { Menu, X, Globe, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">Afrilingo</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#courses" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Courses
            </a>
            <a href="#about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              About
            </a>
            <a href="#features" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Features
            </a>
            <a href="#contact" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
              Sign In
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#courses" className="text-gray-700 hover:text-orange-600 font-medium">
                Courses
              </a>
              <a href="#about" className="text-gray-700 hover:text-orange-600 font-medium">
                About
              </a>
              <a href="#features" className="text-gray-700 hover:text-orange-600 font-medium">
                Features
              </a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 font-medium">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-orange-500 text-orange-600">
                  Sign In
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
