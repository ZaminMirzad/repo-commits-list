import React from 'react';
import { render, screen } from '@testing-library/react';
import { Error } from './Error';
import { MemoryRouter } from 'react-router-dom';

test('render errors details', async () => {
  const error = {
    code: 'ERR_BAD_REQUEST',
    message: 'Request failed with status code 404',
    response: { data: { message: 'Not Found' } },
  };
  render(
    <MemoryRouter>
      <Error error={error} />
    </MemoryRouter>
  );
  const errorElement = screen.getByTestId(/error_element/i);
  const errorCodeElement = screen.getByTestId(/code/i);
  const errorMessageElement = screen.getByTestId(/message/i);
  const errorResponseMessageElement = screen.getByTestId(/response/i);
  errorElement.appendChild(errorCodeElement);
  errorElement.appendChild(errorMessageElement);
  errorElement.appendChild(errorResponseMessageElement);
  expect(errorElement).toBeInTheDocument();

  expect(errorCodeElement).toContainHTML(
    `<strong class="error" data-testid="code">${error.code}</strong>`
  );
  expect(errorMessageElement).toContainHTML(
    `<strong class="error" data-testid="message">${error.message}</strong>`
  );
  expect(errorResponseMessageElement).toContainHTML(
    `<strong class="error" data-testid="response">${error.response.data.message}</strong>`
  );
});
