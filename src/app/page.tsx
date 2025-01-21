"use client"

import Image from "next/image";
import { useState } from "react";
import { DarkModeToggle } from "./components/DarkModeToggle";
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={handleToggleDarkMode} />
    </div>
  );
}
