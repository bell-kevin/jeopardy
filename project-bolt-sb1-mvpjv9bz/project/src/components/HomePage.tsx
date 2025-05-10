import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Award } from 'lucide-react';
import { GameContext } from '../context/GameContext';

const difficultyLevels = [
  { id: 'veryEasy', label: 'Very Easy', color: 'bg-green-500' },
  { id: 'easy', label: 'Easy', color: 'bg-blue-500' },
  { id: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { id: 'hard', label: 'Hard', color: 'bg-orange-500' },
  { id: 'veryHard', label: 'Very Hard', color: 'bg-red-500' }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setDifficulty } = useContext(GameContext);
  
  const handleDifficultySelect = (difficulty: string) => {
    setDifficulty(difficulty);
    navigate('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl w-full bg-blue-800 rounded-xl p-6 sm:p-10 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-center mb-8">
          <Book className="h-12 w-12 mr-4 text-yellow-400" />
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-white">
            Book of Mormon Jeopardy
          </h1>
          <Award className="h-12 w-12 ml-4 text-yellow-400" />
        </div>
        
        <p className="text-xl text-center mb-10 text-blue-100">
          Test your knowledge of the Book of Mormon and early LDS Church history!
        </p>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-300">
          Select Difficulty Level
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {difficultyLevels.map((level) => (
            <button
              key={level.id}
              className={`${level.color} hover:opacity-90 transition-all transform hover:scale-105 text-white py-4 px-6 rounded-lg shadow-md font-bold text-lg`}
              onClick={() => handleDifficultySelect(level.id)}
            >
              {level.label}
            </button>
          ))}
        </div>
        
        <div className="mt-12 p-4 bg-blue-900 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-yellow-300">How to Play:</h3>
          <ol className="list-decimal pl-5 space-y-2 text-blue-100">
            <li>Select a difficulty level to start the game</li>
            <li>Choose a category and point value on the game board</li>
            <li>Answer the question correctly to earn points</li>
            <li>Try to accumulate as many points as possible</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HomePage;