import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from '../features/quiz/quizSlice';
import { RootState } from '../store';
import QuizQuestions from './QuizQuestions';

const Results: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, score, results } = useSelector((state: RootState) => state.quiz);

  const getScoreColor = (score: number) => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleNewQuiz = () => {
    dispatch(resetQuiz());
  };

  return (
    <div className="mx-auto">
      <div className='sticky top-0 bg-white p-2 shadow-lg'>
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      <p className="text-lg mb-4">
        Your score: {score} / {questions.length}
      </p>
      <div data-testid="score-color-bar" className={`h-4 rounded mb-4 ${getScoreColor(score!)}`} />
      </div>
      <div className='p-4'>    
      <QuizQuestions questions={questions} selectedAnswers={results} isResultPage />
      <button
        className="mt-4 p-4 bg-blue-500 text-white rounded-lg"
        onClick={handleNewQuiz}
      >
        Create New Quiz
      </button>
      </div>
    </div>
  );
};

export default Results;