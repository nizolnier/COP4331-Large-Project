import { render, screen } from '@testing-library/react';
import Search from '../screens/Search';
import Router from '../router/Router';

import './sample_cartoons.json'
import './sample_user.json'

test('renders Search', () => {
  render(<Search />);
  const element = screen.getByText(/Search/i);
  expect(element).toBeInTheDocument();
});

test('renders show info (on hover maybe?)')

test('renders have-watched indicators on results correctly')

test('renders want-to-watch indicators on results correctly')

test('partial search works')

test('case insensitivity works')

test('sort by date works')

test('sort alphabetically works')

test('redirects to a shows specific page after clicking a result')

