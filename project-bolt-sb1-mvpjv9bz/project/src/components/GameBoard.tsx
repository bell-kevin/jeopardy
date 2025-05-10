import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { GameContext } from '../context/GameContext';
import CategoryTitle from './CategoryTitle';
import QuestionTile from './QuestionTile';

const GameBoard: React.FC = () => {
  const navigate = useNavigate();
  const { score, categories, resetBoard, initializeGame, answeredQuestions } = useContext(GameContext);
  
  useEffect(() => {
    initializeGame();
  }, []);

  const handleGoHome = () => {
    resetBoard();
    navigate('/');
  };

  const allAnswered = () => {
    const totalQuestions = categories.length * 5; // 5 questions per category
    return answeredQuestions.length === totalQuestions;
  };

  useEffect(() => {
    if (categories.length > 0 && allAnswered()) {
      navigate('/end');
    }
  }, [answeredQuestions, categories]);

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={handleGoHome}
          className="flex items-center text-yellow-300 hover:text-yellow-100 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Home</span>
        </button>
        <div className="text-2xl font-bold text-yellow-300">Score: {score}</div>
      </div>
      
      <div className="flex-grow grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="flex flex-col gap-2">
            <CategoryTitle title={category.name} />
            
            {[100, 200, 300, 400, 500].map((value, index) => (
              <QuestionTile 
                key={`${categoryIndex}-${index}`}
                categoryIndex={categoryIndex}
                questionIndex={index}
                value={value}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;