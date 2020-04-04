import React from 'react';
import { render } from '@testing-library/react';
import ActiveTimer from './ActiveTimer';

test('renders', () => {
  const { getByText } = render(<ActiveTimer seconds={3671} />);
  const linkElement = getByText(/:/);
  expect(linkElement).toBeInTheDocument();
});
