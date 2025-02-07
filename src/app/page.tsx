"use client"

import { useEffect, useState } from "react";
import { DarkModeToggle } from "./components/DarkModeToggle";
import GameMenu from "./components/GameMenu";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Get dark mode preference from localStorage on initial load
    const darkModePreference = localStorage.getItem('darkMode');
    setIsDarkMode(darkModePreference === 'true');
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="absolute top-4 right-4">
        <DarkModeToggle
          isDarkMode={isDarkMode} 
          onToggle={handleToggleDarkMode} 
        />
      </div>
      <GameMenu isDarkMode={isDarkMode} />
    </div>
  );
}
