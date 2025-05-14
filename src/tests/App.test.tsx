import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from '../App';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('App Component', () => {
  it('renders CategorySelector when quiz has not started and no results', () => {
    const store = mockStore({
      quiz: { quizStarted: false, results: null },
      categories: {
        categories: [
          { id: 1, name: 'General Knowledge' },
          { id: 2, name: 'Entertainment: Film' },
        ],
        status: 'succeeded',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Trivia Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/Select a Category/i)).toBeInTheDocument();
  });

  it('renders Quiz when quiz has started and no results', () => {
    const store = mockStore({
        quiz: {
            questions: [
              {
                id: '1',
                question: 'Test question',
                answers: ['A', 'B', 'C', 'D'],
              },
            ],
            selectedAnswers: {},
            status: 'succeeded',
            quizStarted: true,
            results: null,
          },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const triviaText = screen.getAllByText(/Trivia Quiz/i)
    expect(triviaText).toHaveLength(2);
    expect(screen.getByText(/Question/i)).toBeInTheDocument();
  });

  it('renders Results when results are available', () => {
    const store = mockStore({
      quiz: {
        quizStarted: true,
        results: { '1': { selected: 'A', correct: 'A' } },
        questions: [
          {
            id: '1',
            question: 'Sample Question?',
            answers: ['A', 'B', 'C', 'D'],
          },
        ],
        score: 1,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Trivia Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/Quiz Results/i)).toBeInTheDocument();
  });
});
