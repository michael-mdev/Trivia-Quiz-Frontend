import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAnswer, submitAnswers } from "../features/quiz/quizSlice";
import { RootState } from "../store";
import QuizQuestions from "./QuizQuestions";

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, selectedAnswers, status } = useSelector(
    (state: RootState) => state.quiz
  );

  const handleAnswerSelect = (questionId: string, answer: string) => {
    dispatch(selectAnswer({ questionId, answer }));
  };

  const handleSubmit = () => {
    dispatch(submitAnswers({ answers: selectedAnswers }) as any);
  };
  const allAnswered = questions?.every((q) => selectedAnswers[q.id]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Trivia Quiz</h2>
      <QuizQuestions questions={questions} selectedAnswers={selectedAnswers} handleAnswerSelect={handleAnswerSelect} />
      <button
        className={`mt-4 p-4 rounded-lg ${
          allAnswered ? "bg-green-500 text-white" : "bg-gray-300"
        }`}
        disabled={!allAnswered}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Quiz;
