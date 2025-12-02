import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/atoms/ButtonAuth';

describe('ButtonAuth Component', () => {
  test('1. Renderiza correctamente con el texto proporcionado', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('2. Aplica la clase correcta según la variante', () => {
    render(<Button variant="blue">Blue Button</Button>);
    const button = screen.getByText('Blue Button');
    expect(button).toHaveClass('bg-blue-600');
  });

  test('3. Llama a la función onClick cuando se hace clic', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText('Click Me');
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('4. Renderiza con ancho completo si fullWidth es true', () => {
    render(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByText('Full Width Button');
    expect(button).toHaveClass('w-full');
  });
});