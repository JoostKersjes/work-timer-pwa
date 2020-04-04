import React from 'react';
import { render } from '@testing-library/react';
import Timer from './Timer';

test('renders timer', () => {
  const { container } = render(<Timer />);
  expect(container).toBeTruthy();
});
