export default {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!<paquete-que-necesites-transformar>)'],
    testEnvironment: 'jest-environment-jsdom',
  };
  