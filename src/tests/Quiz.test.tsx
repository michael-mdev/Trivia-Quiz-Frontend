import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Quiz from '../components/Quiz';
import { selectAnswer } from '../features/quiz/quizSlice';

const mockStore = configureStore([]);

describe('Quiz', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
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
    store.dispatch = jest.fn();
  });

  it('renders questions and answers', () => {
    render(
      <Provider store={store}>
        <Quiz />
      </Provider>
    );

    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('dispatches selectAnswer on answer click', () => {
    render(
      <Provider store={store}>
        <Quiz />
      </Provider>
    );

    fireEvent.click(screen.getByText('A'));

    expect(store.dispatch).toHaveBeenCalledWith(
      selectAnswer({ questionId: '1', answer: 'A' })
    );
  });
});