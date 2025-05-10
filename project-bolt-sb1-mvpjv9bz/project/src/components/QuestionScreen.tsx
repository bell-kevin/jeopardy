import React, { useState, useContext, useEffect, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';

const QuestionScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentQuestion, markQuestionAnswered, updateScore } = useContext(GameContext);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  
  useEffect(() => {
    if (!currentQuestion) {
      navigate('/game');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestion]);
  
  const handleSubmit = () => {
    if (showAnswer) {
      markQuestionAnswered();
      navigate('/game');
      return;
    }
    
    setShowAnswer(true);
    
    // Simple string comparison - could be enhanced with fuzzy matching
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentQuestion?.answer.trim().toLowerCase();
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      updateScore(currentQuestion?.value || 0);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !showAnswer) {
      handleSubmit();
    }
  };

  if (!currentQuestion) return null;
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-blue-800 rounded-xl p-8 shadow-2xl">
        <div className="mb-6 flex justify-between items-center">
          <div className="text-yellow-300 font-bold">
            {currentQuestion.category}
          </div>
          <div className="bg-blue-700 text-white px-4 py-2 rounded-full">
            ${currentQuestion.value}
          </div>
        </div>
        
        <div className="text-xl sm:text-2xl font-semibold text-white mb-8 text-center p-6 bg-blue-700 rounded-lg">
          {currentQuestion.question}
        </div>
        
        {!showAnswer ? (
          <>
            <div className="mb-8">
              <label htmlFor="answer" className="block text-blue-200 mb-2">
                Your Answer:
              </label>
              <input
                id="answer"
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-3 rounded bg-blue-900 text-white border border-blue-600 focus:border-yellow-300 focus:outline-none"
                placeholder="Type your answer..."
                autoFocus
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-blue-300">
                Time left: {timeLeft} seconds
              </div>
              <button
                onClick={handleSubmit}
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded transition-colors"
              >
                Submit Answer
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className={`text-center text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </div>
            
            <div className="bg-blue-900 p-4 rounded-lg">
              <div className="text-blue-300 mb-1">Correct Answer:</div>
              <div className="text-white text-xl">{currentQuestion.answer}</div>
            </div>
            
            {currentQuestion.explanation && (
              <div className="bg-blue-900 p-4 rounded-lg">
                <div className="text-blue-300 mb-1">Explanation:</div>
                <div className="text-white">{currentQuestion.explanation}</div>
              </div>
            )}
            
            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;