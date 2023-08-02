import { render, screen } from '@testing-library/react';
import Header from '../screens/Header';
import Router from '../router/Router';

import sampleShows from './sample_cartoons.json'
import sampleUser from './sample_user.json'
import sampleReviews from './sample_reviews.json'

test('renders header', () => {
  render(<Header />);
  const element = screen.getByText(/Home/i);
  expect(element).toBeInTheDocument();
  // Test that name and username also render
});

test('home link works', () => {

})

test('browse cartoon link works', () => {

})

test('watchlist link works', () => {

})

test('likes link works', () => {

})

test('renders profile name', () => {

})

test('profile link works', () => {

})

test('logout link works', () => {

}) 
// also test that user is logged out of all pages

test('converts to menu on smaller screens', () => {
  
})