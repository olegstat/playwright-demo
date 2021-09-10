const config = {
  testDir: 'e2e',
  timeout: 10000,
  retries: 0,
  reporter: 'list',
  use: {
    headless: true,
    viewport: {width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        viewport: null,
      },
    },

    {
      name: 'Firefox',
      use: {browserName: 'firefox'},
    },
  ],
};

module.exports = config;
