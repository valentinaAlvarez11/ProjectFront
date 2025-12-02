import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateRoomForm from '@/components/molecules/CreateRoomForm';
import RoomsService from '@/libs/rooms.service';
import { useRouter } from 'next/navigation';

jest.mock('@/libs/rooms.service', () => ({
  createRoom: jest.fn(),
  updateRoom: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateRoomForm Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test('1. Renderiza correctamente el formulario', () => {
    render(<CreateRoomForm />);
    expect(screen.getByPlaceholderText('Ej: 101')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByText('Tipo de Habitación')).toBeInTheDocument();
  });

  
});