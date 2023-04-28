import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LogIn from './LogIn';

describe('LogIn component', () => {
  test('renders email and password input fields', () => {
    const { getByPlaceholderText } = render(<LogIn />);
    const emailInput = getByPlaceholderText('Correo Electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('form submits correctly', async () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <LogIn handleSubmit={mockSubmit} />
    );
    const emailInput = getByPlaceholderText('Correo Electrónico');
    const passwordInput = getByPlaceholderText('Contraseña');
    const submitButton = getByText('Inicia sesión');

    fireEvent.change(emailInput, { target: { value: 'example@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      correo: 'example@test.com',
      contraseña: 'password123',
    });
  });
});
