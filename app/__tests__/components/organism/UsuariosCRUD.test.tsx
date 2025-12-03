import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsuariosCRUD from '@/components/organisms/UsuariosCRUD';
import UsersService from '@/libs/users.service';
import { useAuthStore } from '@/store/authStore';
import { useModal } from '@/hooks/useModal';

jest.mock('@/libs/users.service', () => ({
  __esModule: true,
  default: {
    getAllUsersAdmin: jest.fn(),
    register: jest.fn(),
    updateUserAdmin: jest.fn(),
    deleteUserAdmin: jest.fn(),
  },
}));

const mockUser = {
  id: 1,
  email: 'admin@test.com',
  nombre: 'Admin Test',
  telefono: '1234567890',
  rol: 'admin' as const,
};

jest.mock('@/store/authStore', () => ({
  useAuthStore: jest.fn(() => ({
    user: mockUser,
  })),
}));

const mockOpen = jest.fn();
const mockClose = jest.fn();

jest.mock('@/hooks/useModal', () => ({
  useModal: jest.fn(() => ({
    isOpen: false,
    open: mockOpen,
    close: mockClose,
  })),
}));

jest.mock('@/components/molecules/UsuarioForm', () => {
  return function MockUsuarioForm({ onSubmit, onCancel, initialData, isEditing }: any) {
    return (
      <div data-testid="usuario-form">
        <button onClick={() => onSubmit({ email: 'test@test.com', telefono: '123', nombre: 'Test', rol: 'cliente', contraseña: 'pass123' })}>
          Submit
        </button>
        <button onClick={onCancel}>Cancel</button>
        {isEditing && <span>Editing mode</span>}
        {initialData && <span>Has initial data</span>}
      </div>
    );
  };
});

jest.mock('@/components/atoms/Modal', () => {
  return function MockModal({ isOpen, onClose, title, children }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="modal">
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Close Modal</button>
      </div>
    );
  };
});

jest.mock('@/components/molecules/ConfirmDeleteModal', () => {
  return function MockConfirmDeleteModal({ isOpen, onConfirm, onClose }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="confirm-delete-modal">
        <button onClick={onConfirm}>Confirm Delete</button>
        <button onClick={onClose}>Cancel Delete</button>
      </div>
    );
  };
});

jest.mock('@/components/molecules/SuccessModal', () => {
  return function MockSuccessModal({ isOpen, onClose, message }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="success-modal">
        <p>{message}</p>
        <button onClick={onClose}>Close Success</button>
      </div>
    );
  };
});

jest.mock('@/components/molecules/ErrorModal', () => {
  return function MockErrorModal({ isOpen, onClose, message }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="error-modal">
        <p>{message}</p>
        <button onClick={onClose}>Close Error</button>
      </div>
    );
  };
});

jest.mock('@/components/molecules/ErrorAlert', () => {
  return function MockErrorAlert({ message, onClose }: any) {
    return (
      <div data-testid="error-alert">
        <p>{message}</p>
        <button onClick={onClose}>Close Alert</button>
      </div>
    );
  };
});

jest.mock('@/components/atoms/LoadingSpinner', () => {
  return function MockLoadingSpinner({ message }: any) {
    return <div data-testid="loading-spinner">{message}</div>;
  };
});

jest.mock('@/components/atoms/ButtonAuth', () => {
  return function MockButton({ children, onClick }: any) {
    return <button onClick={onClick}>{children}</button>;
  };
});

describe('UsuariosCRUD', () => {
  const mockUsuarios = [
    {
      id: 1,
      email: 'admin@test.com',
      nombre: 'Admin Test',
      telefono: '1234567890',
      rol: 'admin' as const,
    },
    {
      id: 2,
      email: 'cliente@test.com',
      nombre: 'Cliente Test',
      telefono: '0987654321',
      rol: 'cliente' as const,
    },
    {
      id: 3,
      email: 'recepcionista@test.com',
      nombre: 'Recepcionista Test',
      telefono: '5555555555',
      rol: 'recepcionista' as const,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (UsersService.getAllUsersAdmin as jest.Mock).mockResolvedValue({
      usuarios: mockUsuarios,
    });
  });

  test('1. Renderiza correctamente la lista de usuarios cuando hay datos', async () => {
    render(<UsuariosCRUD />);

    await waitFor(() => {
      expect(screen.getByText('Gestión de Usuarios')).toBeInTheDocument();
      expect(screen.getByText('Administra todos los usuarios del sistema')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Admin Test')).toBeInTheDocument();
      expect(screen.getByText('Cliente Test')).toBeInTheDocument();
      expect(screen.getByText('Recepcionista Test')).toBeInTheDocument();
      expect(screen.getByText('admin@test.com')).toBeInTheDocument();
      expect(screen.getByText('cliente@test.com')).toBeInTheDocument();
    });

    // Verificar que se muestran los botones de acción
    const editButtons = screen.getAllByText('Editar');
    const deleteButtons = screen.getAllByText('Eliminar');
    expect(editButtons.length).toBe(3);
    expect(deleteButtons.length).toBe(3);
  });

  test('2. Muestra el estado de carga inicial', () => {
    (UsersService.getAllUsersAdmin as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Promise que nunca se resuelve
    );

    render(<UsuariosCRUD />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Cargando usuarios...')).toBeInTheDocument();
  });

  test('3. Abre el modal para crear un nuevo usuario al hacer clic en el botón', async () => {
    render(<UsuariosCRUD />);

    await waitFor(() => {
      expect(screen.getByText('+ Crear Usuario')).toBeInTheDocument();
    });

    const createButton = screen.getByText('+ Crear Usuario');
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByText('Crear Usuario')).toBeInTheDocument();
      expect(screen.getByTestId('usuario-form')).toBeInTheDocument();
    });
  });

  test('4. Abre el modal para editar un usuario al hacer clic en el botón editar', async () => {
    render(<UsuariosCRUD />);

    await waitFor(() => {
      expect(screen.getByText('Cliente Test')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByText('Editar');
    // Hacer clic en el segundo botón (para editar el cliente)
    fireEvent.click(editButtons[1]);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByText('Editar Usuario')).toBeInTheDocument();
      expect(screen.getByTestId('usuario-form')).toBeInTheDocument();
      expect(screen.getByText('Editing mode')).toBeInTheDocument();
      expect(screen.getByText('Has initial data')).toBeInTheDocument();
    });
  });
});
