import { renderHook, waitFor } from '@testing-library/react';
import { usePerfil } from '@/hooks/usePerfil';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/store/authStore', () => {
  const actual = jest.requireActual('@/store/authStore');
  return {
    ...actual,
    useAuthStore: jest.fn(() => ({
      isLoggedIn: false,
      user: null,
      loadingAuth: true,
      checkAuthStatus: jest.fn(),
    })),
  };
});

describe('usePerfil', () => {
  const mockPush = jest.fn();
  const mockCheckAuthStatus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuthStore as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      user: null,
      loadingAuth: true,
      checkAuthStatus: mockCheckAuthStatus,
    });
  });

  test('1. Debe llamar checkAuthStatus al montar el hook', () => {
    renderHook(() => usePerfil());
    expect(mockCheckAuthStatus).toHaveBeenCalledTimes(1);
  });

  test('2. Debe redirigir a /login si no está autenticado', async () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      user: null,
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    renderHook(() => usePerfil());

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  test('3. No debe redirigir si el usuario está autenticado', async () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      user: { id: 1, name: 'John Doe' },
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    renderHook(() => usePerfil());

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test('4. Debe devolver los valores correctos', () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      user: { id: 1, name: 'John Doe' },
      loadingAuth: false,
      checkAuthStatus: mockCheckAuthStatus,
    });

    const { result } = renderHook(() => usePerfil());

    expect(result.current.loadingAuth).toBe(false);
    expect(result.current.canAccess).toBe(true);
    expect(result.current.user).toEqual({ id: 1, name: 'John Doe' });
  });
});