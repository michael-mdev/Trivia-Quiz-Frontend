import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../axiosGetRequest";

export interface Question {
  id: string;
  question: string;
  answers: string[];
}

export interface SelectedAnswers { [key: string]: string };

export interface AnswerResult {
  selected: string;
  correct: string;
};

export type Results = {
  [key: string]: AnswerResult;
} | null;


interface QuizState {
  questions: Question[];
  selectedAnswers:SelectedAnswers;
  score: number | null;
  results: Results;
  quizStarted: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: QuizState = {
  questions: [],
  selectedAnswers: {},
  score: null,
  results: null,
  quizStarted: false,
  status: "idle",
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async ({
    category,
    difficulty,
    amount,
  }: {
    category: number;
    difficulty: string;
    amount: number;
  }) => {
    try {
      const response = await axiosInstance.get(
        `/quiz?category=${category}&difficulty=${difficulty}&amount=${amount}`
      );
      return response.data;
    } catch (err: any) {
      throw err;
    }
  }
);

export const submitAnswers = createAsyncThunk(
  "quiz/submitAnswers",
  async ({ answers }: { answers: { [key: string]: string } }) => {
    const response = await axiosInstance.post("quiz/score", { answers });
    return response.data;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    selectAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>
    ) => {
      state.selectedAnswers[action.payload.questionId] = action.payload.answer;
    },
    startQuiz: (state) => {
      state.quizStarted = true;
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.selectedAnswers = {};
      state.score = null;
      state.results = null;
      state.quizStarted = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
        state.quizStarted = true;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch questions";
      })
      .addCase(submitAnswers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitAnswers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.score = action.payload.score;
        state.results = action.payload.results;
      })
      .addCase(submitAnswers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to submit answers";
      });
  },
});

export const { selectAnswer, startQuiz, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
