import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SecondRow from './SecondRow';

describe('<SecondRow />', () => {
  test('it should mount', () => {
    render(<SecondRow />);
    
    const secondRow = screen.getByTestId('SecondRow');

    expect(secondRow).toBeInTheDocument();
  });
});