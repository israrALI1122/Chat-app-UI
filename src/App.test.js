import { render, screen } from '@testing-library/react';
import App from './App';

test('renders forex signal assistant title', () => {
  render(<App />);
  expect(screen.getByText(/forex signal assistant/i)).toBeInTheDocument();
  expect(screen.getByText(/trade plan/i)).toBeInTheDocument();
});
