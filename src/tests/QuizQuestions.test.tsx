import { render, screen, fireEvent } from '@testing-library/react';
import QuizQuestions from '../components/QuizQuestions';

const sampleQuestions = [
  {
    id: '1',
    question: 'What is the capital of France?',
    answers: ['Paris', 'London', 'Berlin', 'Madrid'],
  },
];

describe('QuizQuestions Component', () => {
  it('renders questions and answers', () => {
    render(
      <QuizQuestions
        questions={sampleQuestions}
        selectedAnswers={{}}
        handleAnswerSelect={jest.fn()}
        isResultPage={false}
      />
    );

    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Madrid')).toBeInTheDocument();
  });

  it('calls handleAnswerSelect when an answer is clicked', () => {
    const mockHandleAnswerSelect = jest.fn();

    render(
      <QuizQuestions
        questions={sampleQuestions}
        selectedAnswers={{}}
        handleAnswerSelect={mockHandleAnswerSelect}
        isResultPage={false}
      />
    );

    fireEvent.click(screen.getByText('Paris'));
    expect(mockHandleAnswerSelect).toHaveBeenCalledWith('1', 'Paris');
  });

  it('displays selected and correct answers on result page', () => {
    const selectedAnswers = {
      '1': { selected: 'London', correct: 'Paris' },
    };

    render(
      <QuizQuestions
        questions={sampleQuestions}
        selectedAnswers={selectedAnswers}
        isResultPage={true}
      />
    );

    const correctAnswerButton = screen.getByText('Paris');
    const selectedAnswerButton = screen.getByText('London');

    expect(correctAnswerButton).toHaveClass('bg-green-500');
    expect(selectedAnswerButton).toHaveClass('bg-red-500');
  });

  test('applies correct class when correct answer is selected', () => {
    render(
      <QuizQuestions
        questions={[
          {
            id: '1',
            question: 'Sample Question?',
            answers: ['A', 'B', 'C', 'D'],
          },
        ]}
        selectedAnswers={{
          '1': { selected: 'A', correct: 'A' },
        }}
        isResultPage={true}
      />
    );
  
    const answerButton = screen.getByText('A');
    expect(answerButton).toHaveClass('border-green-400 bg-green-400 text-white');
  });

  test('applies incorrect class when incorrect answer is selected', () => {
    render(
      <QuizQuestions
        questions={[
          {
            id: '1',
            question: 'Sample Question?',
            answers: ['A', 'B', 'C', 'D'],
          },
        ]}
        selectedAnswers={{
          '1': { selected: 'B', correct: 'A' },
        }}
        isResultPage={true}
      />
    );
  
    const answerButton = screen.getByText('B');
    expect(answerButton).toHaveClass('border-red-500 bg-red-500 text-white');
  });
  
});
