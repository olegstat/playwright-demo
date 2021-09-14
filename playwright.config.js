const {devices} = require('@playwright/test');

const config = {
  testDir: 'e2e',
  timeout: 10000,
  retries: 1,
  reporter: [['list'], ['junit', {outputFile: 'test-results/results.xml'}]],
  globalTeardown: './global-teardown',
  use: {
    headless: true,
    viewport: {width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'DesktopChrome',
      use: {
        browserName: 'chromium',
        viewport: null,
      },
    },
    {
      name: 'DesktopFirefox',
      use: {browserName: 'firefox'},
    },
    {
      name: 'DesktopSafari',
      use: {
        browserName: 'webkit',
        viewport: {width: 1200, height: 750},
      },
    },
    {
      name: 'MobileChrome',
      use: devices['Pixel 5'],
    },
    {
      name: 'MobileSafari',
      use: devices['iPhone 12'],
    },
  ],
};

module.exports = config;
