import React from 'react';
import { FiMail } from 'react-icons/fi';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn()
      };
    }
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(<Input name='email' placeholder='E-mail' />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should contain the right elements when icon is not defined', () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(<Input name='email' placeholder='E-mail' />);

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container',);
    const iconElement = queryByTestId('input-icon');
    const nonExistantElement = queryByTestId('does-not-exist');

    expect(inputElement).not.toContainElement(containerElement);
    expect(inputElement).not.toContainElement(iconElement);
    expect(containerElement).toContainElement(inputElement);
    expect(containerElement).not.toContainElement(iconElement);
    expect(containerElement).not.toContainElement(nonExistantElement);
  });

  it('should contain the right elements when icon is defined', async () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <Input name='email' icon={FiMail} placeholder='E-mail' />
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');
    const iconElement = getByTestId('input-icon');
    const nonExistantElement = queryByTestId('does-not-exist');

    expect(inputElement).not.toContainElement(containerElement);
    expect(inputElement).not.toContainElement(iconElement);
    expect(containerElement).toContainElement(inputElement);
    expect(containerElement).toContainElement(iconElement);
    expect(containerElement).not.toContainElement(nonExistantElement);

    await waitFor(() => {
      expect(iconElement).toHaveStyle('height: 20; width: 20;');
      expect(iconElement.lastElementChild).toContainHTML('<polyline points="22,6 12,13 2,6" />');
      expect(iconElement.firstElementChild).toContainHTML(
        '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />'
      );
    });
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Input name='email' placeholder='E-mail' />);

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
      expect(containerElement).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Input name='email' placeholder='E-mail' />);

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com.br'}
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });

  it('should change the input value by typing in it', async () => {
    const { getByPlaceholderText } = render(<Input name='email' placeholder='E-mail' />);

    const inputElement = getByPlaceholderText('E-mail') as HTMLInputElement;

    fireEvent.focus(inputElement);

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com.br'}
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(inputElement.value).toBe('johndoe@example.com.br');
    });

    fireEvent.focus(inputElement);

    fireEvent.change(inputElement, {
      target: { value: 'johntre@example.com.br'}
    });

    await waitFor(() => {
      expect(inputElement.value).toBe('johntre@example.com.br');
    });
  });
});
