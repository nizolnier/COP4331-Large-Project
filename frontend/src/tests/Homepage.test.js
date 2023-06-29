import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';

import sampleShows from './sample_shows.json'
import sampleUser from './sample_user.json'
import sampleReviews from './sample_reviews.json'

test('renders homepage', () => {
  render(<Homepage />);
  const element = screen.getByText(/Hello/i);
  expect(element).toBeInTheDocument();
});

test('renders recent reviews');

test('renders popular cartoons this month');

test('renders cartoons by genre')

test('renders popular tags this month')