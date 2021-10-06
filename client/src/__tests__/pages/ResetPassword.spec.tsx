import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../../pages/ResetPassword';

let mockedLocationSearch = '';
const mockedHistoryPush = jest.fn();
const mockedApiPost = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush
    }),
    useLocation: () => ({
      search: mockedLocationSearch
    })
  };
});

jest.mock('../../services/api', () => {
  return {
    post: () => mockedApiPost()
  };
});

jest.mock('../../hooks/context/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast
    })
  };
});

describe('ResetPassword Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedLocationSearch = '?token=1234';
  });

  it('should be able to reset password', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova Senha');
    const passwordConfirmationField = getByPlaceholderText('Confirmação da Senha');
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/signin');
    });
  });

  it('should not be able to reset password with invalid password confirmation', async () => {
    mockedLocationSearch = '';

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova Senha');
    const passwordConfirmationField = getByPlaceholderText('Confirmação da Senha');
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should not be able to reset password without token', async () => {
    mockedLocationSearch = '';

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova Senha');
    const passwordConfirmationField = getByPlaceholderText('Confirmação da Senha');
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.change(passwordConfirmationField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();

      expect(mockedAddToast).toHaveBeenCalledWith(expect.objectContaining({ type: 'error' }));
    });
  });

});
