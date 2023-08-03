import { queryByText, render, screen, fireEvent } from '@testing-library/react';
import Login from '../screens/Login';
import {MemoryRouter} from "react-router-dom"
import Button from '../components/Button'



test('renders login form', () => {
  render(<MemoryRouter><Login /></MemoryRouter>);

  expect(queryByText(document, "Log in")).toBeTruthy();
});

test('redirects on successful login', () => {
  const mockRedirectUrl = '/cartoons'
  const { getByText } = render( <MemoryRouter><Login redirectUrl={mockRedirectUrl} /></MemoryRouter>);

  const url = window.location.href;
  fireEvent.click(getByText('Log in'));

  expect(window.location.href).toBe(url);  

})

// test('errors on invalid username/password')

// test('forgot password link works')

// test('user remains logged in after navigating')

// test('hides and shows password')

// test('signup link redirects to signup')