import { renderHook, act, waitFor } from '@testing-library/react';
import useLoginForm from '@/hooks/useLoginForm';

// Mock de AuthService
jest.mock('@/libs/auth.service', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
  },
}));

// Mock de useAuthStore
const mockStoreLogin = jest.fn();
jest.mock('@/store/authStore', () => ({
  useAuthStore: () => ({
    login: mockStoreLogin,
  }),
}));

import AuthService from '@/libs/auth.service';

describe('useLoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debería inicializar con valores por defecto', () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.serverError).toBeNull();
    expect(result.current.successMessage).toBeNull();
    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
  });

  test('debería realizar login correctamente', async () => {
    const mockResponse = {
      mensaje: 'Login exitoso',
      usuario: { id: 1, name: 'Test User' },
    };

    (AuthService.login as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.submit({ 
        email: 'test@example.com', 
        password: 'password123' 
      });
    });

    await waitFor(() => {
      expect(result.current.successMessage).toBe('Inicio de sesión exitoso');
    });

    expect(AuthService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      contraseña: 'password123',
    });
    expect(mockStoreLogin).toHaveBeenCalledWith(mockResponse.usuario);
  });
});