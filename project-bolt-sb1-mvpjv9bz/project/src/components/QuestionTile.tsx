import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';

interface QuestionTileProps {
  categoryIndex: number;
  questionIndex: number;
  value: number;
}

const QuestionTile: React.FC<QuestionTileProps> = ({ categoryIndex, questionIndex, value }) => {
  const navigate = useNavigate();
  const { setCurrentQuestion, isQuestionAnswered } = useContext(GameContext);
  
  const isAnswered = isQuestionAnswered(categoryIndex, questionIndex);
  
  const handleClick = () => {
    if (!isAnswered) {
      setCurrentQuestion(categoryIndex, questionIndex);
      navigate('/question');
    }
  };
  
  return (
    <button
      className={`h-20 rounded-md shadow-md font-bold text-2xl transition-all transform hover:scale-105 
        ${isAnswered 
          ? 'bg-gray-700 text-gray-500 cursor-default' 
          : 'bg-blue-600 text-yellow-300 hover:bg-blue-500'}`}
      onClick={handleClick}
      disabled={isAnswered}
    >
      {isAnswered ? '' : value}
    </button>
  );
};

export default QuestionTile;