import React from 'react';

type Props = {
  commit: {
    commit: { author: { date: string; name: string }; message: string };
    url: string;
  };
};

export const Feed = ({ commit }: Props) => {
  return (
    <div className='feed' data-testid='feed-element'>
      <span className='commit__date' data-testid='feed-date' id='feed-date'>
        {new Date(commit.commit?.author?.date).toLocaleString()}
      </span>
      <a
        href={commit.url}
        className='commit__link truncate'
        title={commit.url}
        rel='noreferrer'
        target='_blank'
        data-testid='feed-link'
      >
        [{commit.commit.author?.name}]{commit.url}
      </a>
      <div
        className='commit__message truncate tooltip'
        data-testid='feed-message'
        data-text={commit.commit?.message}
      >
        {commit.commit?.message}
      </div>
    </div>
  );
};
