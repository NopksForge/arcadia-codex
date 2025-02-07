'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function XoPlus() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Get dark mode preference from localStorage on initial load
    const darkModePreference = localStorage.getItem('darkMode');
    setIsDarkMode(darkModePreference === 'true');
  }, []);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          line: [a, b, c]
        };
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || calculateWinner(board)) return;
    
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winInfo = calculateWinner(board);
  const status = winInfo
    ? `Winner: ${winInfo.winner}`
    : board.every(square => square) 
    ? 'Game Draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <Link 
        href="/" 
        className={`absolute top-4 left-4 ${
          isDarkMode ? 'text-blue-400' : 'text-blue-500'
        } hover:underline`}
      >
        Back
      </Link>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">XO Game</h1>
        <div className="mb-4 text-xl font-semibold">{status}</div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {board.map((square, i) => (
            <button
              key={i}
              className={`w-20 h-20 text-4xl font-bold flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 hover:bg-gray-700' 
                  : 'bg-white border-gray-300 hover:bg-gray-100'
              } border-2 ${
                winInfo?.line?.includes(i)
                  ? isDarkMode
                    ? 'bg-green-800 hover:bg-green-700'
                    : 'bg-green-200 hover:bg-green-300'
                  : ''
              }`}
              onClick={() => handleClick(i)}
            >
              {square}
            </button>
          ))}
        </div>
        <button
          className={`px-4 py-2 rounded ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          onClick={() => setBoard(Array(9).fill(null))}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}