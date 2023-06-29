import { render, screen } from '@testing-library/react';
import Profile from './screens/Profile';
import Router from './screens/Router';

import sampleShows from './sample_shows.json'
import sampleUser from './sample_user.json'
import sampleReviews from './sample_reviews.json'

test('renders profile page', () => {
  render(<Profile />);
  const element = screen.getByText(`${sampleUser.name}`);
  expect(element).toBeInTheDocument();
});

test('renders total cartoons')

test('renders total cartoons this year')

test('renders number of reviews')

test('renders recent reviews')

test('renders liked cartoons')

test('renders users recent watched')