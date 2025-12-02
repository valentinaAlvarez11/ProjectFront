import { renderHook, waitFor } from '@testing-library/react';
import { useMisReservas } from '@/hooks/useMisReservas';
import { useAuthStore } from '@/store/authStore';
import ReservationsService from '@/libs/reservations.service';

// Mock de useRouter (sobrescribe el mock global de jest.setup.js)
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

// Mock de useAuthStore
const mockCheckAuthStatus = jest.fn();
jest.mock('@/store/authStore', () => ({
  useAuthStore: jest.fn(),
}));

// Mock de ReservationsService
jest.mock('@/libs/reservations.service', () => ({
  __esModule: true,
  default: {
    getMyReservations: jest.fn(),
  },
}));

describe('useMisReservas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
    mockCheckAuthStatus.mockClear();
    mockCheckAuthStatus.mockResolvedValue(undefined);
  });

  test('1. Debe llamar checkAuthStatus al montar el hook', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      user: null,
      loadingAuth: true,
      checkAuthStatus: mockCheckAuthStatus,
    });

    renderHook(() => useMisReservas());

    expect(mockCheckAuthStatus).toHaveBeenCalledTimes(1);
  });

  test('2. Debe cargar reservas cuando el usuario está autenticado como cliente', async () => {
    const mockReservations = {
      reservas: [
        {
          id: 1,
          habitacionId: 101,
          usuarioId: 1,
          fecha_inicio: '2024-01-01',
          fecha_fin: '2024-01-05',
          estado: 'confirmada' as const,
          precio_total: 500,
        },
      ],
    };

    (ReservationsService.getMyReservations as jest.Mock).mockResolvedValue(mockReservations);

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      user: { rol: 'cliente' },
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    const { result } = renderHook(() => useMisReservas());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.reservations).toEqual(mockReservations.reservas);
    expect(result.current.error).toBeNull();
    expect(result.current.canAccess).toBe(true);
  });

  test('3. Debe redirigir a /login cuando no está autenticado', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      user: null,
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    renderHook(() => useMisReservas());

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/login');
      },
      { timeout: 3000 }
    );
  });
});
