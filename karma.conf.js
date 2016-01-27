module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      'mocha'
    ],
    reporters: [
      'spec', 'coverage'
    ],
    files: [
      // React.js requires bind and phantomJS does not support it
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests/**/*_test.*'
    ],
    preprocessors: {
      // convert files with webpack and load sourcemaps
      'tests/**/*_test.*': ['webpack', 'sourcemap']
    },
    browsers: [
      'PhantomJS'
    ],
    singleRun: true,
    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html'
    },
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      noInfo: true
    }
  });
};
