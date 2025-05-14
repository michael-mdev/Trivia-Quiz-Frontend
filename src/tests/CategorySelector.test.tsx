import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CategorySelector from '../components/CategorySelector';

const mockStore = configureStore([]);

describe('CategorySelector', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      categories: {
        categories: [
          { id: 1, name: 'General Knowledge' },
          { id: 2, name: 'Entertainment: Film' },
        ],
        status: 'succeeded',
        error: null,
      },
      quiz: {
        quizStarted: false,
        results: null,
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders category dropdown', () => {
    render(
      <Provider store={store}>
        <CategorySelector />
      </Provider>
    );

    expect(screen.getByText('General Knowledge')).toBeInTheDocument();
    expect(screen.getByText('Entertainment: Film')).toBeInTheDocument();
  });

  it('dispatches fetchQuestions on button click', () => {
    render(
      <Provider store={store}>
        <CategorySelector />
      </Provider>
    );
    const selects = screen.getAllByRole('combobox');

    fireEvent.change(selects[0], { target: { value: '1' } });       // category
    fireEvent.change(selects[1], { target: { value: 'easy' } });    // difficulty
    fireEvent.click(screen.getByText('Create'));

    expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'quiz/startQuiz' }));
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('displays loading message when categories are loading', () => {
    const store = mockStore({
      categories: {
        categories: [],
        status: 'loading',
        error: null,
      },
      quiz: {
        quizStarted: false,
        results: null,
      },
    });

    render(
      <Provider store={store}>
        <CategorySelector />
      </Provider>
    );

    expect(screen.getByText('Loading categories...')).toBeInTheDocument();
  });
});