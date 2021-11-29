import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Mixer from './Mixer';

describe('<Mixer />', () => {
  test('it should mount', () => {
    render(<Mixer />);
    
    const mixer = screen.getByTestId('Mixer');

    expect(mixer).toBeInTheDocument();
  });
});