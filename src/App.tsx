import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./features/categories/categoriesSlice";
import { RootState } from "./store";
import CategorySelector from "./components/CategorySelector";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { quizStarted, results } = useSelector(
    (state: RootState) => state.quiz
  );

  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold text-center">Trivia Quiz</h1>
      </header>
      <main className="container mx-auto p-4">
        {!quizStarted && !results && <CategorySelector />}
        {quizStarted && !results && <Quiz />}
        {results && <Results />}
      </main>
    </div>
  );
};

export default App;
