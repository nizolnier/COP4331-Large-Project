import { render, screen } from '@testing-library/react';
import ReviewForm from '../screens/ReviewForm';
import Router from '../router/Router';

import sampleShows from './sample_cartoons.json'
import sampleUser from './sample_user.json'
import sampleReviews from './sample_reviews.json'

test('renders review form', () => {
  render(<ReviewForm />);
  const element = screen.getByText(/Write Your Review/i);
  expect(element).toBeInTheDocument();
  const title = screen.getByText(`${sampleShows[0].title}`);
  expect(title).toBeInTheDocument();
});

test('renders show title and cover')

test('adds date watched')

test('cannot add future date watched')

test('adds star rating')

test('adds show to liked')

test('adds review text')

test('errors on empty form')

test('cancels form')

// Check that changes are reflected across the app
test('publishes form successfully')