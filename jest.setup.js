// jest.setup.js - Configuración para pruebas en Next.js
import '@testing-library/jest-dom'

// Polyfill para atob si es necesario
if (typeof atob === 'undefined') {
  global.atob = (str) => Buffer.from(str, 'base64').toString('binary');
}

// Mock de Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Suprimir console.error en pruebas (opcional, comentar si necesitas ver los errores)
// global.console = {
//   ...console,
//   error: jest.fn(),
// };
