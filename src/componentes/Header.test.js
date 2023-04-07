import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renderiza el componente correctamente', () => {
    const { getByTestId } = render(<Header />);

    // Verifica que el componente se renderice correctamente
    expect(getByTestId('cabecera')).toBeInTheDocument();
    expect(getByTestId('mensaje')).toBeInTheDocument();
  });

  it('muestra el texto correcto en el mensaje', () => {
    const { getByTestId } = render(<Header />);

    // Verifica que el texto en el mensaje sea correcto
    expect(getByTestId('mensaje')).toHaveTextContent('NutriApp');
  });

  it('muestra la imagen correcta en el logo', () => {
    const { getByAltText } = render(<Header />);

    // Verifica que la imagen en el logo sea correcta
    expect(getByAltText('hola')).toBeInTheDocument();
  });
});
