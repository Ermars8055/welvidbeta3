import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface SettingsProps {
  onThemeChange: (theme: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onThemeChange }) => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Settings</h1>
      
      {/* Theme Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Theme</h2>
        
        {/* Dark/Light Theme Options */}
        <div className="flex flex-col space-y-4">
          <button
            className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:shadow transition-colors"
            onClick={() => onThemeChange('light')}
          >
            <Sun className="h-5 w-5 text-yellow-500" />
            <span className="text-gray-800 dark:text-gray-100">Light Theme</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:shadow transition-colors"
            onClick={() => onThemeChange('dark')}
          >
            <Moon className="h-5 w-5 text-gray-600" />
            <span className="text-gray-800 dark:text-gray-100">Dark Theme</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
