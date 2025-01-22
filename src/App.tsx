import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reels from './pages/Reels';
import Create from './pages/Create';
import Login from './pages/Login';
import About from './pages/About';
import CreatorPage from './pages/CreatorPage';
import Settings from './pages/Settings'; // Import the new Settings page

function App() {
  const [theme, setTheme] = useState<string>('light');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme); // Update theme state dynamically
    // Add the class to `document.body` to ensure the entire app reflects the theme
    document.body.classList.remove('light', 'dark'); // Remove existing theme classes
    document.body.classList.add(newTheme); // Apply the selected theme
  };

  return (
    <Router>
      {/* Apply dynamic background based on the theme */}
      <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-gray-800 text-gray-200'}`}>
        <Navbar onThemeChange={handleThemeChange} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/creator/:id" element={<CreatorPage />} />
          {/* Add Settings route and pass `onThemeChange` prop */}
          <Route path="/settings" element={<Settings onThemeChange={handleThemeChange} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
