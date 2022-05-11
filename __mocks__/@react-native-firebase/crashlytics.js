const hasPermission = jest.fn(() => Promise.resolve(true));
const requestPermission = jest.fn(() => Promise.resolve(true));
const subscribeToTopic = jest.fn();
const unsubscribeFromTopic = jest.fn();
const getToken = jest.fn(() => Promise.resolve('myMockToken'));

export default jest.fn(() => ({
  hasPermission,
  subscribeToTopic,
  unsubscribeFromTopic,
  requestPermission,
  getToken,
}));
