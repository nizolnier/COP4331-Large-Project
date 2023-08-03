import { queryByText, render, screen } from '@testing-library/react';
import SignUp from '../screens/SignUp';
import {MemoryRouter} from "react-router-dom"

test('renders signup form', () => {
  render(<MemoryRouter><SignUp/></MemoryRouter>);
  expect(queryByText(document, "Sign up")).toBeTruthy();
});

// Longer than 8 characters
// // At least one special character, one number
// test('shows password requirements on weak passwords')

// test('shows error message if username is already taken')

// test('shows error message if email is already taken')

// test('errors on incorrect email format')

// test('errors on empty form')

// test('prevents SQL injection attacks')

// test('asks for password twice')

// test('shows error message if passwords do not match')

// test('login link works')

// test('redirects to login on successful signup')