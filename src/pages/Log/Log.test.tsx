import React from 'react';
import { render } from '@testing-library/react';
import Log from './Log';

test('renders log', () => {
  const { getByText } = render(<Log />);
  const linkElement = getByText(/log/i);
  expect(linkElement).toBeInTheDocument();
});
