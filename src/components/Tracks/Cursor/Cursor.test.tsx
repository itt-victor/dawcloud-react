import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cursor from './Cursor';

describe('<Cursor />', () => {
  test('it should mount', () => {
    render(<Cursor />);
    
    const cursor = screen.getByTestId('Cursor');

    expect(cursor).toBeInTheDocument();
  });
});