import { render, screen } from '@testing-library/react';
import Show from '../screens/Show';
import Router from '../router/Router';

import sampleShows from './sample_shows.json'
import sampleUser from './sample_user.json'
import sampleReviews from './sample_reviews.json'

test('renders show page', () => {
  render(<Show />);
  const element = screen.getByText(`${sampleShows[0].title}`);
  expect(element).toBeInTheDocument();
});

test('renders show info (title, date, TV-rating, description, cover, etc.)')

test('renders show average rating')

test('renders have-watched indicator')

test('renders want-to-watch indicator')

test('adds show to watchlist')

test('adds show to have-watched and prompts user for a review')

test('adds show to liked')

test('renders reviews by most recent first')

test('sorts reviews by date')

test('sorts reviews by rating')