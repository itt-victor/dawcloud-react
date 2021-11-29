import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loading from './Loading';

describe('<Loading />', () => {
  test('it should mount', () => {
    render(<Loading />);
    
    const loading = screen.getByTestId('Loading');

    expect(loading).toBeInTheDocument();
  });
});