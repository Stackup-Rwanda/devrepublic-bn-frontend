export default {
  __esModule: true,
  post: jest.fn(() => Promise.resolve({ data: { } })),
  get: jest.fn(() => Promise.resolve({ data: { data: { } } })),
  patch: jest.fn(() => Promise.resolve({ data: { data: { } } })),
  put: jest.fn(() => Promise.resolve({ data: { } })),
  default: jest.fn(() => Promise.resolve({ data: { } })),
};
