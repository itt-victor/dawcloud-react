import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TrackNames from './TrackNames';

describe('<TrackNames />', () => {
  test('it should mount', () => {
    render(<TrackNames />);
    
    const trackNames = screen.getByTestId('TrackNames');

    expect(trackNames).toBeInTheDocument();
  });
});