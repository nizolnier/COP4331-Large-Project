import { render, screen } from '@testing-library/react';
import Signup from './screens/Signup';
import Router from './screens/Router';

test('renders signup form', () => {
  render(<Signup />);
  const element = screen.getByText(/Signup/i);
  expect(element).toBeInTheDocument();
});

// Longer than 8 characters
// At least one special character, one number
test('shows password requirements on weak passwords')

test('shows error message if username is already taken')

test('shows error message if email is already taken')

test('errors on incorrect email format')

test('errors on empty form')

test('prevents SQL injection attacks')

test('asks for password twice')

test('shows error message if passwords do not match')

test('login link works')

test('redirects to login on successful signup')