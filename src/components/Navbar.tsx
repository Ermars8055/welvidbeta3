import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Film, Users, PenSquare, Settings } from 'lucide-react';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onThemeChange: (theme: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeChange }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleThemeToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    onThemeChange(newTheme);
  };

  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <nav className="bg-white shadow-lg fixed top-0 left-0 h-full w-60 z-50 flex flex-col items-center py-6 space-y-6 dark:bg-gray-900">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="images/logo.jpeg" alt="WELVID" className="h-8 w-8" />
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">WELVID</span>
        </Link>

        {/* Navigation Links */}
        <Link to="/" className="nav-link flex flex-col items-center">
          <Home className="h-6 w-6 dark:text-gray-200" />
          <span>Home</span>
        </Link>
        <Link to="/reels" className="nav-link flex flex-col items-center">
          <Film className="h-6 w-6 dark:text-gray-200" />
          <span>Reels</span>
        </Link>
        <Link to="/create" className="nav-link flex flex-col items-center">
          <PenSquare className="h-6 w-6 dark:text-gray-200" />
          <span>Create</span>
        </Link>
        <Link to="/about" className="nav-link flex flex-col items-center">
          <Users className="h-6 w-6 dark:text-gray-200" />
          <span>About</span>
        </Link>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Login
        </Link>

        {/* Navigate to Settings Page */}
        <Link to="/settings" className="nav-link flex flex-col items-center">
          <Settings className="h-6 w-6 dark:text-gray-200" />
          <span>Settings</span>
        </Link>

        {/* Theme Toggle */}
        <div className="flex justify-center mt-4">
          <div
            onClick={handleThemeToggle}
            className="flex items-center justify-center w-14 h-8 rounded-full border-2 border-gray-400 dark:border-gray-600 cursor-pointer"
          >
            <div
              className={`w-6 h-6 bg-gray-300 rounded-full transition-transform ${
                isDark ? 'translate-x-6' : ''
              }`}
            ></div>
            <div className="absolute text-xs text-gray-700 dark:text-gray-300">
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="ml-60 flex-1 p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="rounded-full bg-gray-100 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
