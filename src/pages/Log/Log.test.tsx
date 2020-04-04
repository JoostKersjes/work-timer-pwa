import React from 'react';
import { render } from '@testing-library/react';
import Log from './Log';

test('renders log', () => {
  const { container } = render(<Log />);
  expect(container).toBeTruthy();
});
