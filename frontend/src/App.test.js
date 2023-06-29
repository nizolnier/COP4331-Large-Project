import { render, screen } from '@testing-library/react';
import App from './App';

test('renders howdy', () => {
  render(<App />);
  const linkElement = screen.getByText(/howdy partners!/i);
  expect(linkElement).toBeInTheDocument();
});