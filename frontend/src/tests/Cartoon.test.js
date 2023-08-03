import { queryByText, render, screen } from '@testing-library/react';
import Cartoon from '../screens/Cartoon';
import {MemoryRouter} from "react-router-dom"

import sampleShows from './sample_cartoons.json'


test('renders show page', () => {
  const c = sampleShows[0];
  render(<MemoryRouter><Cartoon cartoon={c} id={c._id} /></MemoryRouter>);
  expect(queryByText(document, "Ratings")).toBeTruthy();
});

// test('renders show info (title, date, TV-rating, description, cover, etc.)')

// test('renders show average rating')

// test('renders have-watched indicator')

// test('renders want-to-watch indicator')

// test('adds show to watchlist')

// test('adds show to have-watched and prompts user for a review')

// test('adds show to liked')

// test('renders reviews by most recent first')

// test('sorts reviews by date')

// test('sorts reviews by rating')