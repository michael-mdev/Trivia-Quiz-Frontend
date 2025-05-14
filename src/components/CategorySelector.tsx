import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions, startQuiz } from "../features/quiz/quizSlice";
import { RootState } from "../store";

const CategorySelector: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector(
    (state: RootState) => state.categories
  );
  const [category, setCategory] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [amount] = useState<number>(5);

  const handleStartQuiz = () => {
    if (category) {
      dispatch(startQuiz());
      dispatch(fetchQuestions({ category, difficulty, amount }) as any);
    }
  };

  if (status === "loading")
    return <div className="text-center py-4">Loading categories...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mt-2">QUIZ MAKER</h2>
      </div>
      <div className="flex items-center flex-wrap gap-4 w-full space-x-2 bg-white p-2 rounded-lg shadow-sm max-w-3xl">
        <select
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 grow"
          value={category || ""}
          onChange={(e) => setCategory(Number(e.target.value))}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 grow"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!category}
          onClick={handleStartQuiz}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
