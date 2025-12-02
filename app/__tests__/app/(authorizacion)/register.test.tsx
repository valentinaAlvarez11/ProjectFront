import { renderHook, act, waitFor } from '@testing-library/react';
import useRegisterForm from '@/hooks/useRegisterForm';

// Mock de AuthService
jest.mock('@/libs/auth.service', () => ({
  __esModule: true,
  default: {
    register: jest.fn(),
  },
}));

import AuthService from '@/libs/auth.service';

describe('useRegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debería inicializar con valores por defecto', () => {
    const { result } = renderHook(() => useRegisterForm());

    expect(result.current.serverError).toBeNull();
    expect(result.current.successMessage).toBeNull();
    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
  });

  test('debería realizar registro correctamente', async () => {
    const mockResponse = {
      mensaje: 'Usuario registrado exitosamente',
    };

    (AuthService.register as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useRegisterForm());

    await act(async () => {
      await result.current.submit({ 
        email: 'test@example.com',
        telefono: '123456789',
        nombre: 'Test User',
        contraseña: 'password123'
      });
    });

    await waitFor(() => {
      expect(result.current.successMessage).toBe('Usuario registrado exitosamente');
    });

    expect(AuthService.register).toHaveBeenCalledWith({
      email: 'test@example.com',
      telefono: '123456789',
      nombre: 'Test User',
      contraseña: 'password123',
    });
  });
});
