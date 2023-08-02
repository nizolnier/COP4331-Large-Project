import { render, screen } from '@testing-library/react';
import Login from '../screens/Login';
import Router from '../router/Router';

import sampleUser from './sample_user.json'

test('renders login form', () => {
  render(<Login />);
  const element = screen.getByText("we loging in");
  expect(element).toBeInTheDocument();
});

test('redirects on successful login', () => {
  const mockRedirectUrl = '/cartoons'
  const { getByText } = render(<LoginPage redirectUrl={mockRedirectUrl} />);

  fireEvent.click(getByText('Login'));

  // Check if the browser's current URL is the expected redirect URL after login
  expect(window.location.href).toBe(mockRedirectUrl);    fireEvent.click(getByText('Login'));

})

test('errors on invalid username/password')

test('forgot password link works')

test('user remains logged in after navigating')

test('hides and shows password')

test('signup link redirects to signup')