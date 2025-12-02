import { renderHook, waitFor, act } from '@testing-library/react';
import { useNuevaReserva } from '@/hooks/useNuevaReserva';
import { useAuthStore } from '@/store/authStore';
import { CreateReservationFormData } from '@/schemas/reservation';

// Mock de useRouter
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

// Mock de useModal
jest.mock('@/hooks/useModal', () => ({
  useModal: jest.fn(() => ({
    isOpen: false,
    open: jest.fn(),
    close: jest.fn(),
    toggle: jest.fn(),
  })),
}));

// Mock de sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

describe('useNuevaReserva', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPush.mockClear();
    mockCheckAuthStatus.mockClear();
    mockCheckAuthStatus.mockResolvedValue(undefined);
    sessionStorageMock.clear();
  });

  test('1. Debe llamar checkAuthStatus al montar el hook', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      user: null,
      loadingAuth: true,
      checkAuthStatus: mockCheckAuthStatus,
    });

    renderHook(() => useNuevaReserva());

    expect(mockCheckAuthStatus).toHaveBeenCalledTimes(1);
  });

  test('2. Debe redirigir a /login cuando no está autenticado', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      user: null,
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    renderHook(() => useNuevaReserva());

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/login');
      },
      { timeout: 3000 }
    );
  });

  test('3. Debe redirigir a / cuando el usuario no es cliente', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      user: { rol: 'admin' },
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    renderHook(() => useNuevaReserva());

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/');
      },
      { timeout: 3000 }
    );
  });

  test('4. Debe retornar canAccess=true cuando está autenticado como cliente', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      user: { rol: 'cliente' },
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    const { result } = renderHook(() => useNuevaReserva());

    expect(result.current.canAccess).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  test('5. Debe guardar en sessionStorage y redirigir al hacer submit', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      user: { rol: 'cliente' },
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    const { result } = renderHook(() => useNuevaReserva());

    const formData: CreateReservationFormData = {
      habitacionId: 101,
      fecha_inicio: '2024-01-01',
      fecha_fin: '2024-01-05',
    };

    await act(async () => {
      await result.current.handleSubmit(formData);
    });

    const storedData = sessionStorageMock.getItem('pendingReservation');
    expect(storedData).toBeTruthy();
    
    const parsedData = JSON.parse(storedData!);
    expect(parsedData.habitacionId).toBe(101);
    expect(parsedData.fecha_inicio).toBe('2024-01-01');
    expect(parsedData.fecha_fin).toBe('2024-01-05');

    expect(mockPush).toHaveBeenCalledWith(
      '/pago?habitacionId=101&fecha_inicio=2024-01-01&fecha_fin=2024-01-05'
    );
  });

  test('6. Debe redirigir a /gestiones al cancelar', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      user: { rol: 'cliente' },
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    const { result } = renderHook(() => useNuevaReserva());

    act(() => {
      result.current.handleCancel();
    });

    expect(mockPush).toHaveBeenCalledWith('/gestiones');
  });

  test('7. Debe manejar errores en handleSubmit y abrir el modal de error', async () => {
    const { useModal } = require('@/hooks/useModal');
    const mockErrorOpen = jest.fn();
    const mockSuccessOpen = jest.fn();
    
    // El hook llama a useModal dos veces: successModal y errorModal
    (useModal as jest.Mock)
      .mockReturnValueOnce({
        isOpen: false,
        open: mockSuccessOpen,
        close: jest.fn(),
        toggle: jest.fn(),
      })
      .mockReturnValueOnce({
        isOpen: false,
        open: mockErrorOpen,
        close: jest.fn(),
        toggle: jest.fn(),
      });

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      user: { rol: 'cliente' },
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    const { result } = renderHook(() => useNuevaReserva());

    // Simular un error forzando que sessionStorage.setItem lance un error
    const originalSetItem = sessionStorageMock.setItem;
    sessionStorageMock.setItem = jest.fn(() => {
      throw new Error('Storage error');
    });

    const formData: CreateReservationFormData = {
      habitacionId: 101,
      fecha_inicio: '2024-01-01',
      fecha_fin: '2024-01-05',
    };

    await act(async () => {
      await result.current.handleSubmit(formData);
    });

    expect(mockErrorOpen).toHaveBeenCalled();
    expect(result.current.errorMessage).toBe('Storage error');
    expect(result.current.isSubmitting).toBe(false);

    // Restaurar
    sessionStorageMock.setItem = originalSetItem;
  });
});
