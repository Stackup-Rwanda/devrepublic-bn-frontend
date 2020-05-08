export default {
  post: jest.fn(() => Promise.resolve({ data: { } })),
  get: jest.fn(() => Promise.resolve({ data: { data: { } } })),
  patch: jest.fn(() => Promise.resolve({ data: { data: { } } })),
};
