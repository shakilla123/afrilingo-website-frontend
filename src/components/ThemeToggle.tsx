
import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const themes = [
  { name: 'Light Theme', class: 'theme-light', primary: 'bg-amber-800', secondary: 'bg-amber-50' },
  { name: 'Dark Theme', class: 'theme-dark', primary: 'bg-gray-800', secondary: 'bg-gray-100' },
  { name: 'Warm Brown', class: 'theme-brown', primary: 'bg-amber-900', secondary: 'bg-amber-100' },
  { name: 'Rich Mahogany', class: 'theme-mahogany', primary: 'bg-red-900', secondary: 'bg-red-100' }
];

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('theme-light');

  useEffect(() => {
    // Set default theme on load
    document.documentElement.classList.add('theme-light');
  }, []);

  const changeTheme = (themeClass: string) => {
    // Remove all theme classes
    themes.forEach(theme => {
      document.documentElement.classList.remove(theme.class);
    });
    
    // Add the selected theme class
    document.documentElement.classList.add(themeClass);
    
    // Apply theme-specific CSS variables
    const root = document.documentElement;
    
    switch (themeClass) {
      case 'theme-dark':
        root.style.setProperty('--background', '0 0% 5%');
        root.style.setProperty('--foreground', '0 0% 98%');
        root.style.setProperty('--card', '0 0% 8%');
        root.style.setProperty('--card-foreground', '0 0% 98%');
        break;
      case 'theme-brown':
        root.style.setProperty('--background', '39 100% 97%');
        root.style.setProperty('--foreground', '39 100% 15%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '39 100% 15%');
        break;
      case 'theme-mahogany':
        root.style.setProperty('--background', '0 100% 97%');
        root.style.setProperty('--foreground', '0 100% 15%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '0 100% 15%');
        break;
      default: // theme-light
        root.style.setProperty('--background', '0 0% 100%');
        root.style.setProperty('--foreground', '0 0% 3.9%');
        root.style.setProperty('--card', '0 0% 100%');
        root.style.setProperty('--card-foreground', '0 0% 3.9%');
        break;
    }
    
    setActiveTheme(themeClass);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 left-6 h-12 w-12 rounded-full bg-amber-800 hover:bg-amber-900 shadow-lg z-50"
        size="icon"
      >
        <Palette className="h-5 w-5" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-40 left-6 w-64 shadow-2xl z-40 border-2 border-amber-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-amber-900 mb-4">App Appearance</h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.class}
                  onClick={() => changeTheme(theme.class)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeTheme === theme.class
                      ? 'bg-amber-100 border-2 border-amber-300'
                      : 'hover:bg-amber-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex gap-1">
                    <div className={`w-4 h-4 rounded-full ${theme.primary}`}></div>
                    <div className={`w-4 h-4 rounded-full ${theme.secondary}`}></div>
                  </div>
                  <span className="text-sm font-medium text-amber-900">{theme.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ThemeToggle;
