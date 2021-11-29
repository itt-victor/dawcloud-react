import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Buttonpad from './Buttonpad';

describe('<Buttonpad />', () => {
  test('it should mount', () => {
    render(<Buttonpad />);
    
    const buttonpad = screen.getByTestId('Buttonpad');

    expect(buttonpad).toBeInTheDocument();
  });
});