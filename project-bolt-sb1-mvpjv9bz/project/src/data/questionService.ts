import { Category } from '../types';
import { 
  prophetsQuestions, 
  scripturesQuestions, 
  peopleQuestions, 
  geographyQuestions, 
  historyQuestions 
} from './questions';

// Select 5 random categories
const getRandomCategories = (
  difficulty: string, 
  allCategories: Record<string, Category[]>
): Category[] => {
  // Get categories for the selected difficulty
  const difficultyCategories = allCategories[difficulty] || allCategories.medium;
  
  // Shuffle array and take the first 5 categories
  const shuffled = [...difficultyCategories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

export const getQuestionsByDifficulty = (difficulty: string): Category[] => {
  // Organize all categories by difficulty
  const allCategories: Record<string, Category[]> = {
    veryEasy: [
      prophetsQuestions.veryEasy,
      scripturesQuestions.veryEasy,
      peopleQuestions.veryEasy,
      geographyQuestions.veryEasy,
      historyQuestions.veryEasy
    ],
    easy: [
      prophetsQuestions.easy,
      scripturesQuestions.easy,
      peopleQuestions.easy,
      geographyQuestions.easy,
      historyQuestions.easy
    ],
    medium: [
      prophetsQuestions.medium,
      scripturesQuestions.medium,
      peopleQuestions.medium,
      geographyQuestions.medium,
      historyQuestions.medium
    ],
    hard: [
      prophetsQuestions.hard,
      scripturesQuestions.hard,
      peopleQuestions.hard,
      geographyQuestions.hard,
      historyQuestions.hard
    ],
    veryHard: [
      prophetsQuestions.veryHard,
      scripturesQuestions.veryHard,
      peopleQuestions.veryHard,
      geographyQuestions.veryHard,
      historyQuestions.veryHard
    ]
  };
  
  return getRandomCategories(difficulty, allCategories);
};