import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TopRow from './TopRow';

describe('<Top-row />', () => {
  test('it should mount', () => {
    render(<TopRow />);
    
    const topRow = screen.getByTestId('Top-row');

    expect(topRow).toBeInTheDocument();
  });
});