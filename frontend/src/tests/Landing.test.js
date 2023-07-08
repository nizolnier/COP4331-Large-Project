import { render, screen } from '@testing-library/react';
import Landing from './Landing';

import sampleShows from './sample_shows.json'
import sampleUser from './sample_user.json'
import sampleReviews from './sample_reviews.json'

test('renders landing page', () => {
  render(<Landing />);
  const element = screen.getByText(/AppName/i);
  expect(element).toBeInTheDocument();
});

test('action link redirects to signup');