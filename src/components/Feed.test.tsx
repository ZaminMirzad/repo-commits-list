import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Feed } from './Feed';

describe('Feed component', () => {
  const commit = {
    commit: {
      author: { date: '1/14/2022, 7:55:52 PM', name: 'Aadesh' },
      message: 'bug fix',
    },
    url: 'https://api.github.com/repos/m3db/m3/commits/dba205d01f2ea92db6c7a284c7ed2b9dca5619ed',
  };
  render(
    <MemoryRouter>
      <Feed commit={commit} />
    </MemoryRouter>
  );

  const feedElement = screen.getByTestId('feed-element');
  const feedDate = screen.getByTestId('feed-date');
  const feedLink = screen.getByRole('link');
  const feedMessage = screen.getByTestId('feed-message');

  feedElement.appendChild(feedDate);
  feedElement.appendChild(feedLink);
  feedElement.appendChild(feedMessage);

  it('should render feed element', () => {});
  expect(feedElement).toBeInTheDocument();

  expect(feedDate).toBeInTheDocument();

  it('should display link', async () => {
    feedLink.setAttribute('href', commit.url);
    feedLink.setAttribute('title', commit.url);
    feedLink.setAttribute('data-testid', 'feed-link');
    expect(feedLink).toHaveAttribute('href', commit.url);
  });

  feedMessage.innerHTML = commit.commit.message;
  expect(feedMessage).toBeInTheDocument();
});
