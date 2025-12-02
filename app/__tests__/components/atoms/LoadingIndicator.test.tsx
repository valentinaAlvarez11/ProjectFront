import { render, screen } from '@testing-library/react';
import LoadingIndicator from '@/components/atoms/LoadingIndicator';

describe('LoadingIndicator Component', () => {
  test('1. Renderiza correctamente con el mensaje proporcionado', () => {
    render(<LoadingIndicator message="Cargando..." />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('2. Renderiza correctamente sin mensaje', () => {
    render(<LoadingIndicator />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  test('3. Aplica clases personalizadas correctamente', () => {
    render(
      <LoadingIndicator
        className="custom-class"
        textClassName="custom-text-class"
        message="Cargando..."
      />
    );

    const container = screen.getByText('Cargando...').parentElement?.parentElement;
    expect(container).toHaveClass('custom-class');
    expect(screen.getByText('Cargando...')).toHaveClass('custom-text-class');
  });
});