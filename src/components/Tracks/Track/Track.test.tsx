import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Track from './Track';

describe('<Track />', () => {
  test('it should mount', () => {
    render(<Track />);
    
    const track = screen.getByTestId('Track');

    expect(track).toBeInTheDocument();
  });
});