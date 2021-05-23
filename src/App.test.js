import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hit Button', () => {
  render(<App />);
  const hitButton = screen.getAllByText(/Hit/i);
  expect(hitButton.length).toBeGreaterThan(0);
});
