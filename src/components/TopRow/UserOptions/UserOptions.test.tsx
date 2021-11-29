import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserOptions from './UserOptions';

describe('<User_options />', () => {
  test('it should mount', () => {
    render(<UserOptions />);
    
    const userOptions = screen.getByTestId('UserOptions');

    expect(userOptions).toBeInTheDocument();
  });
});