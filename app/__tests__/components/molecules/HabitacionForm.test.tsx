import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HabitacionForm from '@/components/molecules/HabitacionForm';
import { CreateRoomFormData } from '@/schemas/room';
import { IRoom } from '@/interfaces/rooms';

describe('HabitacionForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnSubmit.mockResolvedValue(undefined);
  });

  test('1. Renderiza correctamente los campos del formulario', () => {
    render(<HabitacionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText('Número de Habitación')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo de Habitación')).toBeInTheDocument();
    expect(screen.getByLabelText('Precio por Noche')).toBeInTheDocument();
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument();
    expect(screen.getByText('Características')).toBeInTheDocument();
    expect(screen.getByText('Instalaciones')).toBeInTheDocument();
    expect(screen.getByText('Imágenes')).toBeInTheDocument();
  });

  test('2. Llama a onSubmit con los datos correctos cuando se completa el formulario', async () => {
    render(<HabitacionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Llenar campos básicos
    fireEvent.change(screen.getByLabelText('Número de Habitación'), {
      target: { value: '101' },
    });
    
    const tipoSelect = screen.getByLabelText('Tipo de Habitación');
    fireEvent.change(tipoSelect, { target: { value: 'Suite' } });

    fireEvent.change(screen.getByLabelText('Precio por Noche'), {
      target: { value: '150' },
    });
    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: 'Habitación con vista al mar.' },
    });

    // Llenar características
    const tamanoSelect = screen.getByLabelText('Tamaño');
    fireEvent.change(tamanoSelect, { target: { value: '30 m²' } });

    const camasSelect = screen.getByLabelText('Camas');
    fireEvent.change(camasSelect, { target: { value: '1 Cama Doble' } });

    const vistaSelect = screen.getByLabelText('Vista');
    fireEvent.change(vistaSelect, { target: { value: 'Vista al Mar' } });

    fireEvent.click(screen.getByRole('button', { name: /crear habitación/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      const callArgs = mockOnSubmit.mock.calls[0][0];
      expect(callArgs.numero).toBe('101');
      expect(callArgs.tipo).toBe('Suite');
      expect(callArgs.precio_noche).toBe(150);
      expect(callArgs.descripcion).toBe('Habitación con vista al mar.');
      expect(callArgs.caracteristicas.tamano).toBe('30 m²');
      expect(callArgs.caracteristicas.camas).toBe('1 Cama Doble');
      expect(callArgs.caracteristicas.vista).toBe('Vista al Mar');
    });
  });

  test('3. Muestra errores de validación cuando los campos están vacíos', async () => {
    render(<HabitacionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByRole('button', { name: /crear habitación/i }));

    await waitFor(() => {
      expect(screen.getByText(/número de habitación es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/tipo de habitación es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/el precio debe ser mayor a 0/i)).toBeInTheDocument();
    });
  });

  test('4. Llama a onCancel cuando se hace clic en el botón Cancelar', () => {
    render(<HabitacionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('5. Muestra el botón deshabilitado cuando isSubmitting es true', () => {
    render(
      <HabitacionForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
        isSubmitting={true}
      />
    );

    const submitButton = screen.getByRole('button', { name: /creando/i });
    expect(submitButton).toBeDisabled();
  });

  test('6. Muestra "Guardar Cambios" en modo edición', () => {
    const mockHabitacion: IRoom = {
      id: 1,
      numero: '101',
      tipo: 'Suite',
      precio_noche: 150,
      descripcion: 'Descripción existente',
      disponible: true,
      caracteristicas: {
        tamano: '30 m²',
        camas: '1 Cama Doble',
        vista: 'Vista al Mar',
        instalaciones: {
          wifi: true,
          television: false,
          aireAcondicionado: true,
          banoDucha: true,
          plancha: false,
          toallas: true,
          smartTV: false,
          refrigerador: false,
        },
      },
      imagenes: ['https://example.com/image1.jpg'],
    };

    render(
      <HabitacionForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
        habitacion={mockHabitacion}
      />
    );

    expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeInTheDocument();
  });

  

  

});
