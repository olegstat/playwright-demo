const { devices } = require('@playwright/test');

const config = {
    testDir: 'e2e',
    timeout: 30000,
    retries: 2,
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        baseURL: 'https://www.saucedemo.com/',
        screenshot: 'only-on-failure',
        },
        projects: [
            {
              name: 'Chrome',
              use: {
                browserName: 'chromium',
        
                // Any Chromium-specific options.
                viewport: { width: 600, height: 800 },
              },
            },
        
            {
              name: 'Firefox',
              use: { browserName: 'firefox' },
            },
          ],
};

module.exports = config;