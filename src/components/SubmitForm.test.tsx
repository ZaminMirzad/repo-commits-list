import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SubmitForm from './SubmitForm';

describe('Submit form', () => {
  const setCommits = () => {};
  const setError = () => {};

  jest.mock('axios', () => ({
    __esModule: true,
    default: {
      get: () => ({
        data: [
          {
            commit: {
              author: { name: 'Andrew Mains' },
              url: '"https://api.github.com/repos/m3db/m3/git/commits/d564f69fbf6342a7f0d5fdcb3f220b1b1c59943d"',
            },
          },
        ],
      }),
    },
  }));

  it('should render username input element', () => {
    render(
      <MemoryRouter>
        <SubmitForm setCommits={setCommits} setError={setError} />
      </MemoryRouter>
    );
    const usernameInputElement = screen.getByPlaceholderText(/john/i);
    expect(usernameInputElement).toBeInTheDocument();
  });

  it('should render repository name input element', () => {
    render(
      <MemoryRouter>
        <SubmitForm setCommits={setCommits} setError={setError} />
      </MemoryRouter>
    );
    const repoNameInputElement = screen.getByPlaceholderText(/repo/i);
    expect(repoNameInputElement).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(
      <MemoryRouter>
        <SubmitForm setCommits={setCommits} setError={setError} />
      </MemoryRouter>
    );
    const submitButtonElement = screen.getByRole(/button/i);
    expect(submitButtonElement).toBeInTheDocument();
  });

  test('input value shoud be empty', () => {
    render(
      <MemoryRouter>
        <SubmitForm setCommits={setCommits} setError={setError} />
      </MemoryRouter>
    );
    const usernameInputElement = screen.getByPlaceholderText(/john/i);
    const repoInputElement = screen.getByPlaceholderText(/repo/i);
    expect(usernameInputElement.innerHTML).toBe('');
    expect(repoInputElement.innerHTML).toBe('');
  });

  test('should change username input', () => {
    render(
      <MemoryRouter>
        <SubmitForm setCommits={setCommits} setError={setError} />
      </MemoryRouter>
    );
    const usernameInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/john/i);
    const testValue = 'test';
    fireEvent.change(usernameInputElement, { target: { value: testValue } });
    expect(usernameInputElement.value).toBe(testValue);
  });

  it('should change  repo input value', () => {
    render(
      <MemoryRouter>
        <SubmitForm setCommits={setCommits} setError={setError} />
      </MemoryRouter>
    );
    const repoNameInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/repo/i);
    const testValue = 'repo';
    fireEvent.change(repoNameInputElement, {
      target: { value: testValue },
    });
    expect(repoNameInputElement.value).toBe(testValue);
  });

  it('should not display please wait...', () => {
    render(
      <MemoryRouter>
        <SubmitForm setCommits={setCommits} setError={setError} />
      </MemoryRouter>
    );
    const buttonElement = screen.getByRole(/button/i);
    expect(buttonElement).not.toHaveTextContent(/Please wait.../i);
  });
  it('should display please wait...', () => {
    render(
      <MemoryRouter>
        <SubmitForm setCommits={setCommits} setError={setError} />
      </MemoryRouter>
    );

    const buttonElement = screen.getByRole(/button/i);
    const usernameInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/john/i);
    const repoNameInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/repo/i);
    const testValue = 'repo';

    fireEvent.change(repoNameInputElement, { target: { value: testValue } });
    fireEvent.change(usernameInputElement, { target: { value: testValue } });
    fireEvent.click(buttonElement);

    expect(buttonElement).toHaveTextContent(/Please wait.../i);
  });
  it('should display please wait... while fetching', async () => {
    render(
      <MemoryRouter>
        <SubmitForm setCommits={setCommits} setError={setError} />
      </MemoryRouter>
    );

    const buttonElement = screen.getByRole(/button/i);
    const usernameInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/john/i);
    const repoNameInputElement: HTMLInputElement =
      screen.getByPlaceholderText(/repo/i);
    const testValue = 'repo';

    fireEvent.change(repoNameInputElement, { target: { value: testValue } });
    fireEvent.change(usernameInputElement, { target: { value: testValue } });
    fireEvent.click(buttonElement);

    await waitFor(() =>
      expect(buttonElement).toHaveTextContent(/Please wait.../i)
    );
  });

  // test('should submit data', () => {
  //   // test here
  // });
});
