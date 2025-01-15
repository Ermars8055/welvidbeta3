import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reels from './pages/Reels';
import Create from './pages/Create';
import Login from './pages/Login';
import About from './pages/About';
import CreatorPage from './pages/CreatorPage'; // Add this import

function App() {
  const [theme, setTheme] = useState<string>('light');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
        <Navbar onThemeChange={handleThemeChange} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/creator/:id" element={<CreatorPage />} /> {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
