import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Film, Users, PenSquare, Sun, Moon, Palette } from 'lucide-react';

interface NavbarProps {
  onThemeChange: (theme: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeChange }) => {
  const [theme, setTheme] = useState<string>('light');
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  useEffect(() => {
    document.body.className = theme; // Apply the theme to the body
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    onThemeChange(newTheme); // Notify parent about theme change
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* Replace this with your logo */}
              <img src="images/logo.jpeg" alt="WELVID" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-800"> WELVID </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className="nav-link">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/reels" className="nav-link">
              <Film className="h-5 w-5" />
              <span>Reels</span>
            </Link>
            <Link to="/create" className="nav-link">
              <PenSquare className="h-5 w-5" />
              <span>Create</span>
            </Link>
            <Link to="/about" className="nav-link">
              <Users className="h-5 w-5" />
              <span>About</span>
            </Link>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Login
            </Link>
            <div className="relative">
              <button 
                className="theme-button" 
                aria-label="Theme Selector" 
                onClick={toggleDropdown}
              >
                <Palette className="h-5 w-5" />
                <span>Theme</span>
              </button>
              {isDropdownVisible && (
                <div className="theme-dropdown">
                  <button
                    className={`theme-item ${theme === 'light' ? 'font-bold' : ''}`}
                    onClick={() => handleThemeChange('light')}
                  >
                    <Sun className="inline h-4 w-4 mr-2" /> Light
                  </button>
                  <button
                    className={`theme-item ${theme === 'colorful' ? 'font-bold' : ''}`}
                    onClick={() => handleThemeChange('colorful')}
                  >
                    <Palette className="inline h-4 w-4 mr-2" /> Dark
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
