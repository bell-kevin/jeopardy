export interface Question {
  question: string;
  answer: string;
  explanation?: string;
  category?: string;
  value?: number;
}

export interface Category {
  name: string;
  questions: Question[];
}