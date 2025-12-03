import { render, screen, waitFor } from '@testing-library/react';
import ReservasPageContent from '@/components/organisms/ReservasPageContent';
import { useReservas } from '@/hooks/useReservas';

jest.mock('@/hooks/useReservas');

jest.mock('@/components/molecules/ReservationForm', () => {
  return function MockReservationForm({ onSubmit, onCancel, isLoading }: any) {
    return (
      <div data-testid="reservation-form">
        <button onClick={() => onSubmit({ habitacionId: 1, fecha_inicio: '2024-01-01', fecha_fin: '2024-01-05' })}>
          Submit
        </button>
        <button onClick={onCancel}>Cancel</button>
        {isLoading && <span>Submitting...</span>}
      </div>
    );
  };
});

jest.mock('@/components/atoms/LoadingState', () => {
  return function MockLoadingState({ message }: any) {
    return <div data-testid="loading-state">{message}</div>;
  };
});

jest.mock('@/components/atoms/PageContainer', () => {
  return function MockPageContainer({ children }: any) {
    return <div data-testid="page-container">{children}</div>;
  };
});

jest.mock('@/components/atoms/PageHeader', () => {
  return function MockPageHeader({ title, subtitle }: any) {
    return (
      <div data-testid="page-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    );
  };
});

jest.mock('@/components/molecules/SuccessModal', () => {
  return function MockSuccessModal({ isOpen, message, onClose }: any) {
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
  return function MockErrorModal({ isOpen, message, onClose }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="error-modal">
        <p>{message}</p>
        <button onClick={onClose}>Close Error</button>
      </div>
    );
  };
});

describe('ReservasPageContent', () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleCancel = jest.fn();
  const mockSuccessModal = {
    isOpen: false,
    open: jest.fn(),
    close: jest.fn(),
  };
  const mockErrorModal = {
    isOpen: false,
    open: jest.fn(),
    close: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1. Muestra el estado de carga cuando isLoading es true', () => {
    (useReservas as jest.Mock).mockReturnValue({
      isLoading: true,
      canAccess: false,
      isSubmitting: false,
      errorMessage: '',
      successMessage: '',
      successModal: mockSuccessModal,
      errorModal: mockErrorModal,
      handleSubmit: mockHandleSubmit,
      handleCancel: mockHandleCancel,
    });

    render(<ReservasPageContent />);

    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('2. No renderiza nada cuando canAccess es false', () => {
    (useReservas as jest.Mock).mockReturnValue({
      isLoading: false,
      canAccess: false,
      isSubmitting: false,
      errorMessage: '',
      successMessage: '',
      successModal: mockSuccessModal,
      errorModal: mockErrorModal,
      handleSubmit: mockHandleSubmit,
      handleCancel: mockHandleCancel,
    });

    const { container } = render(<ReservasPageContent />);

    expect(container.firstChild).toBeNull();
  });

  test('3. Renderiza el formulario de reserva cuando canAccess es true', () => {
    (useReservas as jest.Mock).mockReturnValue({
      isLoading: false,
      canAccess: true,
      isSubmitting: false,
      errorMessage: '',
      successMessage: '',
      successModal: mockSuccessModal,
      errorModal: mockErrorModal,
      handleSubmit: mockHandleSubmit,
      handleCancel: mockHandleCancel,
    });

    render(<ReservasPageContent />);

    expect(screen.getByTestId('page-container')).toBeInTheDocument();
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByText('Nueva Reserva')).toBeInTheDocument();
    expect(screen.getByText('Completa el formulario para crear una nueva reserva')).toBeInTheDocument();
    expect(screen.getByTestId('reservation-form')).toBeInTheDocument();
  });

  test('4. Muestra el modal de éxito cuando successModal está abierto', () => {
    const openSuccessModal = {
      ...mockSuccessModal,
      isOpen: true,
    };

    (useReservas as jest.Mock).mockReturnValue({
      isLoading: false,
      canAccess: true,
      isSubmitting: false,
      errorMessage: '',
      successMessage: 'Reserva creada exitosamente',
      successModal: openSuccessModal,
      errorModal: mockErrorModal,
      handleSubmit: mockHandleSubmit,
      handleCancel: mockHandleCancel,
    });

    render(<ReservasPageContent />);

    expect(screen.getByTestId('success-modal')).toBeInTheDocument();
    expect(screen.getByText('Reserva creada exitosamente')).toBeInTheDocument();
  });
});
