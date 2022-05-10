/* eslint-disable no-undef */
jest.mock('react-native-gesture-handler', () => {
  return {
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(() => Promise.resolve()),
    getInitialNotification: jest.fn(() => Promise.resolve()),
  };
});

jest.mock('@react-native-google-signin/google-signin', () => {
  return {
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(() => Promise.resolve()),
    getInitialNotification: jest.fn(() => Promise.resolve()),
  };
});

jest.mock('@react-native-firebase/app', () => {
  return {
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(() => Promise.resolve()),
    getInitialNotification: jest.fn(() => Promise.resolve()),
  };
});
