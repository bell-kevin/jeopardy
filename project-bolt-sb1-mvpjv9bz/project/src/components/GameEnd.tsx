import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, RotateCcw } from 'lucide-react';
import { GameContext } from '../context/GameContext';

const GameEnd: React.FC = () => {
  const navigate = useNavigate();
  const { score, resetGame, difficulty } = useContext(GameContext);
  
  // Calculate maximum possible score based on categories (5 categories * 5 questions * avg 300 points)
  const maxScore = 7500;
  const percentage = Math.round((score / maxScore) * 100);
  
  const getFeedback = () => {
    if (percentage >= 90) return "Amazing! You're a Book of Mormon scholar!";
    if (percentage >= 70) return "Great job! Your knowledge is impressive!";
    if (percentage >= 50) return "Good effort! You know your Book of Mormon!";
    if (percentage >= 30) return "Not bad! Keep studying!";
    return "Keep learning! The Book of Mormon has so much to offer!";
  };
  
  const getDifficultyLabel = () => {
    const labels: Record<string, string> = {
      veryEasy: "Very Easy",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      veryHard: "Very Hard"
    };
    return labels[difficulty] || difficulty;
  };

  const handlePlayAgain = () => {
    resetGame();
    navigate('/game');
  };
  
  const handleNewGame = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-blue-800 rounded-xl p-8 shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <Award className="h-16 w-16 text-yellow-400" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
          Game Complete!
        </h1>
        
        <div className="text-xl text-blue-100 mb-2">
          Difficulty: <span className="text-yellow-300 font-semibold">{getDifficultyLabel()}</span>
        </div>
        
        <div className="bg-blue-900 rounded-lg p-6 mb-8">
          <div className="text-2xl font-bold text-white mb-2">
            Final Score: <span className="text-yellow-300">{score}</span>
          </div>
          <div className="text-blue-200">
            {percentage}% of maximum possible score
          </div>
        </div>
        
        <div className="text-xl text-blue-100 mb-10">
          {getFeedback()}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handlePlayAgain}
            className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded flex items-center justify-center"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Play Again (Same Difficulty)
          </button>
          
          <button
            onClick={handleNewGame}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded"
          >
            Select New Difficulty
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameEnd;