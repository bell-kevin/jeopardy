import React, { createContext, useState, useEffect } from 'react';
import { getQuestionsByDifficulty } from '../data/questionService';
import { Category, Question } from '../types';

interface GameContextProps {
  difficulty: string;
  score: number;
  categories: Category[];
  currentQuestion: Question | null;
  answeredQuestions: string[];
  setDifficulty: (difficulty: string) => void;
  updateScore: (points: number) => void;
  resetGame: () => void;
  resetBoard: () => void;
  initializeGame: () => void;
  setCurrentQuestion: (categoryIndex: number, questionIndex: number) => void;
  markQuestionAnswered: () => void;
  isQuestionAnswered: (categoryIndex: number, questionIndex: number) => boolean;
}

export const GameContext = createContext<GameContextProps>({
  difficulty: 'medium',
  score: 0,
  categories: [],
  currentQuestion: null,
  answeredQuestions: [],
  setDifficulty: () => {},
  updateScore: () => {},
  resetGame: () => {},
  resetBoard: () => {},
  initializeGame: () => {},
  setCurrentQuestion: () => {},
  markQuestionAnswered: () => {},
  isQuestionAnswered: () => false,
});

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [difficulty, setDifficulty] = useState('medium');
  const [score, setScore] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  
  const initializeGame = () => {
    // Get questions based on selected difficulty
    const gameCategories = getQuestionsByDifficulty(difficulty);
    setCategories(gameCategories);
  };
  
  const resetBoard = () => {
    setScore(0);
    setCurrentQuestion(null);
    setAnsweredQuestions([]);
    setCategories([]);
  };
  
  const resetGame = () => {
    setScore(0);
    setCurrentQuestion(null);
    setAnsweredQuestions([]);
    initializeGame();
  };
  
  const updateScore = (points: number) => {
    setScore(prev => prev + points);
  };
  
  const handleSetCurrentQuestion = (categoryIndex: number, questionIndex: number) => {
    if (categories.length > categoryIndex) {
      const category = categories[categoryIndex];
      if (category.questions.length > questionIndex) {
        const question = category.questions[questionIndex];
        setCurrentQuestion({
          ...question,
          category: category.name,
          value: [100, 200, 300, 400, 500][questionIndex],
        });
      }
    }
  };
  
  const markQuestionAnswered = () => {
    if (currentQuestion) {
      const questionId = `${currentQuestion.category}-${currentQuestion.value}`;
      setAnsweredQuestions(prev => [...prev, questionId]);
    }
  };
  
  const isQuestionAnswered = (categoryIndex: number, questionIndex: number) => {
    if (categories.length <= categoryIndex) return false;
    
    const category = categories[categoryIndex];
    const value = [100, 200, 300, 400, 500][questionIndex];
    const questionId = `${category.name}-${value}`;
    
    return answeredQuestions.includes(questionId);
  };
  
  return (
    <GameContext.Provider
      value={{
        difficulty,
        score,
        categories,
        currentQuestion,
        answeredQuestions,
        setDifficulty,
        updateScore,
        resetGame,
        resetBoard,
        initializeGame,
        setCurrentQuestion: handleSetCurrentQuestion,
        markQuestionAnswered,
        isQuestionAnswered,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};