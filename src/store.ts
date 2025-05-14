import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/categories/categoriesSlice';
import quizReducer from './features/quiz/quizSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;