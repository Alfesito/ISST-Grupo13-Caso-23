import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Historial from './Historial';

describe('Historial component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          comida: 'Ensalada',
          kcal: 100,
          proteina: 10,
          carb: 20,
          grasa: 5,
          fibra: 3,
          fecha: '2022-04-25'
        },
        {
          id: 2,
          comida: 'Pollo con arroz',
          kcal: 450,
          proteina: 30,
          carb: 60,
          grasa: 12,
          fibra: 5,
          fecha: '2022-04-24'
        }
      ]),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display a table with the history of ingestas and allow deleting them', async () => {
    render(<Historial />);

    // Wait for the fetch call to complete and for the table to be rendered
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Comida')).toBeInTheDocument();
    expect(screen.getByText('Ensalada')).toBeInTheDocument();
    expect(screen.getByText('Pollo con arroz')).toBeInTheDocument();

    // Click on the delete button of the first ingesta and wait for it to be removed from the table
    fireEvent.click(screen.getByTestId('eliminar-button-1'));
    await waitFor(() => expect(screen.queryByText('Ensalada')).not.toBeInTheDocument());

    // Click on the delete button of the second ingesta and wait for it to be removed from the table
    fireEvent.click(screen.getByTestId('eliminar-button-2'));
    await waitFor(() => expect(screen.queryByText('Pollo con arroz')).not.toBeInTheDocument());
  });
});

