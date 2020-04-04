import React from 'react';
import { render } from '@testing-library/react';
import ActiveTimer from './ActiveTimer';

test('renders', () => {
  const { container } = render(<ActiveTimer seconds={3671} />);
  expect(container).toBeTruthy();
});
