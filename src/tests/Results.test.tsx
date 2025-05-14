import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Results from '../components/Results';

const mockStore = configureStore([]);

let store: any;

beforeEach(() => {
 store = mockStore({
  quiz: {
    questions: [
      {
        id: '1',
        question: 'What is 2 + 2?',
        answers: ['3', '4', '5', '6'],
      },
    ],
    score: 1,
    results: {
      '1': { selected: '3', correct: '4' },
    },
  },
});
})

describe("Results", () => {

    const renderComponentWithScore = (score: number) => {
    
        render(
          <Provider store={store}>
            <Results />
          </Provider>
        );
      };
    test('renders score and handles new quiz creation', () => {
      render(
        <Provider store={store}>
          <Results />
        </Provider>
      );
    
      expect(screen.getByText('Your score: 1 / 1')).toBeInTheDocument();
    
      const newQuizButton = screen.getByText('Create New Quiz');
      fireEvent.click(newQuizButton);
    
      const actions = store.getActions();
      expect(actions).toContainEqual({ type: 'quiz/resetQuiz' });
})
it('applies bg-red-500 class when score is 1 or less', () => {
    renderComponentWithScore(1);
    const coloredDiv = screen.getByTestId('score-color-bar');
    expect(coloredDiv).toHaveClass('bg-red-500');
  });

});