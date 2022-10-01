import React from 'react';
import { Link } from 'react-router-dom';

export const Error = ({ error }: any) => {
  return (
    <div className='error-wrapper' data-testid='error_element'>
      <h1>Something went wrong due to the following error</h1>
      <div>
        <p>
          code:{' '}
          <strong className='error' data-testid='code'>
            {error?.code}
          </strong>
        </p>
        <p>
          message:{' '}
          <strong className='error' data-testid='message'>
            {error?.message}
          </strong>
        </p>
        <p>
          response message:{' '}
          <strong className='error' data-testid='response'>
            {error?.response?.data?.message}
          </strong>
        </p>
      </div>
      <Link to='/' className='back-btn'>
        Home
      </Link>
    </div>
  );
};
