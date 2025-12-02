// jest-setup.js para mockear AsyncStorage en pruebas
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Polyfill atob for Jest environment
if (typeof atob === 'undefined') {
  global.atob = (str) => Buffer.from(str, 'base64').toString('binary');
}

// Solo aplicar mocks si jest está definido
if (typeof jest !== 'undefined') {
  // Mock console
  const originalConsole = global.console;
  global.console = {
    ...originalConsole,
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  };

  // Mock react-native-reanimated
  jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => {};
    return Reanimated;
  });

  // Mock react-native Animated
  // Solo mockear si existe el módulo (para evitar errores en entornos donde no está)
  try {
    jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
  } catch (e) {
    // Ignorar si no existe
  }

  // Mock AsyncStorage
  jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

  // Mock react-native
  jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    RN.NativeModules.StatusBarManager = {
      getHeight: jest.fn(),
      setStyle: jest.fn(),
      setHidden: jest.fn(),
    };
    return RN;
  });

  // Mock user-event
  jest.mock('@testing-library/user-event', () => ({
    ...jest.requireActual('@testing-library/user-event'),
    default: {
      setup: jest.fn(),
      click: jest.fn(),
      type: jest.fn(),
      clear: jest.fn(),
      selectOptions: jest.fn(),
      upload: jest.fn(),
    },
  }));
}
