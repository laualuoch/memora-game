import { render, screen } from '@testing-library/react';
import App from './../App';
import "jest-canvas-mock";

test('renders landing page', () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Flipper/);
});