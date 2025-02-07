'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GameItem {
  id: string;
  name: string;
  imageUrl: string;
  tags: string[];
  link: string;
}

interface GameMenuProps {
  isDarkMode: boolean;
}

const GameMenu = ({ isDarkMode }: GameMenuProps) => {
  const [games] = useState<GameItem[]>([
    {
      id: '1',
      name: 'Sample Game 1',
      imageUrl: '/games/sample1.jpg',
      tags: ['Action', 'Adventure'],
      link: '/xoplus'
    },
    {
      id: '2',
      name: 'Sample Game 2',
      imageUrl: '/games/sample1.jpg',
      tags: ['Strategy', 'Simulation'],
      link: '/xoplus'
    },
    // Add more games as needed
  ]);

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link 
            href={game.link} 
            key={game.id}
            className={`block rounded-lg overflow-hidden shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            } hover:opacity-80 transition-opacity cursor-pointer`}
          >
            <div className="relative h-48 w-full">
              <Image
                src={game.imageUrl}
                alt={game.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{game.name}</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-sm ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameMenu;
