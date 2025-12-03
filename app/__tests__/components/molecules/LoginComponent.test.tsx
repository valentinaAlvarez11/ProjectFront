import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginComponent from '@/components/molecules/LoginComponent';
import { useAuthStore } from '@/store/authStore';
import { useModal } from '@/hooks/useModal';
import useLoginForm from '@/hooks/useLoginForm';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock('@/store/authStore', () => ({
  useAuthStore: jest.fn(() => ({ 
    user: null,
    getState: () => ({ user: null }),
  })),
}));

jest.mock('@/hooks/useLoginForm');
jest.mock('@/hooks/useModal');

describe('LoginComponent', () => {
  const mockSubmit = jest.fn();
  const mockOpenModal = jest.fn();
  const mockCloseModal = jest.fn();
  const mockHandleSubmit = jest.fn((fn) => (e: any) => {
    e.preventDefault();
    return fn({ email: 'test@example.com', password: 'password123' });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    const useLoginForm = require('@/hooks/useLoginForm').default;
    const useModal = require('@/hooks/useModal').useModal;

    // Mock register to return proper form register object
    const mockRegister = jest.fn((name: string) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }));

    useLoginForm.mockImplementation(() => ({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      formState: { errors: {} },
      submit: mockSubmit,
      serverError: null,
      successMessage: null,
    }));

    useModal.mockImplementation(() => ({
      isOpen: false,
      open: mockOpenModal,
      close: mockCloseModal,
    }));
  });

  test('1. Renderiza correctamente los campos y botones', () => {
    render(<LoginComponent />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    // Buscar el botón de submit específicamente (no el de Google)
    const submitButton = screen.getByRole('button', { name: /^login$/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(screen.getByText(/forgot your password/i)).toBeInTheDocument();
  });

  test('2. Llama a submit con datos válidos', async () => {
    const useLoginForm = require('@/hooks/useLoginForm').default;
    const mockRegister = jest.fn((name: string) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }));

    const testSubmit = jest.fn();

    useLoginForm.mockImplementation(() => ({
      register: mockRegister,
      handleSubmit: (fn: (data: any) => void) => (e: any) => {
        e?.preventDefault?.();
        fn({ email: 'test@example.com', password: 'password123' });
      },
      formState: { errors: {} },
      submit: testSubmit,
      serverError: null,
      successMessage: null,
    }));

    render(<LoginComponent />);

    // Buscar específicamente el botón de submit (type="submit")
    const loginButton = screen.getByRole('button', { name: /^login$/i });
    expect(loginButton).toHaveAttribute('type', 'submit');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(testSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  test('3. Muestra errores de validación cuando los campos están vacíos', async () => {
    const useLoginForm = require('@/hooks/useLoginForm').default;
    const mockRegister = jest.fn((name: string) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }));

    useLoginForm.mockImplementation(() => ({
      register: mockRegister,
      handleSubmit: (fn: (data: any) => void) => (e: any) => {
        e?.preventDefault?.();
        fn({ email: '', password: '' });
      },
      formState: { 
        errors: { 
          email: { message: 'Email es requerido' }, 
          password: { message: 'Password es requerido' } 
        } 
      },
      submit: mockSubmit,
      serverError: null,
      successMessage: null,
    }));

    render(<LoginComponent />);

    // Buscar específicamente el botón de submit (type="submit")
    const loginButton = screen.getByRole('button', { name: /^login$/i });
    expect(loginButton).toHaveAttribute('type', 'submit');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/email es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/password es requerido/i)).toBeInTheDocument();
    });
  });

  test('4. Muestra el modal de error cuando hay un error del servidor', async () => {
    const useLoginForm = require('@/hooks/useLoginForm').default;
    const useModal = require('@/hooks/useModal').useModal;
    const mockRegister = jest.fn((name: string) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }));

    useLoginForm.mockImplementation(() => ({
      register: mockRegister,
      handleSubmit: (fn: (data: any) => void) => (e: any) => {
        e?.preventDefault?.();
        fn({ email: 'test@example.com', password: 'password123' });
      },
      formState: { errors: {} },
      submit: mockSubmit,
      serverError: 'Error en el servidor',
      successMessage: null,
    }));

    useModal.mockImplementation(() => ({
      isOpen: true,
      open: mockOpenModal,
      close: mockCloseModal,
    }));

    render(<LoginComponent />);

    await waitFor(() => {
      expect(mockOpenModal).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/error en el inicio de sesión/i)).toBeInTheDocument();
      expect(screen.getByText(/error en el servidor/i)).toBeInTheDocument();
    });
  });
});
