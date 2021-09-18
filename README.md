Test results for the latest commit:
[![Linter](https://github.com/olegstat/playwright-demo/actions/workflows/lint.yml/badge.svg)](https://github.com/olegstat/playwright-demo/actions/workflows/lint.yml)
[![E2E](https://github.com/olegstat/playwright-demo/actions/workflows/e2e.yml/badge.svg)](https://github.com/olegstat/playwright-demo/actions/workflows/e2e.yml)
[![API](https://github.com/olegstat/playwright-demo/actions/workflows/api.yml/badge.svg)](https://github.com/olegstat/playwright-demo/actions/workflows/api.yml)

# Automation Framework Demo

This repo contains:

- The UI automation framework for the [saucedemo.com](https://www.saucedemo.com/) using the **Playwright** and **JS**, performing the purchase flow. Playwright docs: [playwright.dev](https://playwright.dev/)
- The API automation framework of the Users endpoint from [gorest.co.in](https://gorest.co.in/) using **Postman** and **Newman**. **JS** is used for writing the scripts and tests as well. Newman docs: [newman](https://learning.postman.com/docs/running-collections/using-newman-cli/command-line-integration-with-newman/)

## Features

**Common**:

- Integration with CI/CD (Github Actions): E2E, API, and Linter tests are executed in the cloud each time the **main** branch is synchronized (on every commit). Email notifications on test run fail.
- All frameworks are in the same repo
- NPM used as the package manager gives the possibility to customize the run scripts and integrate with a wide variety of tech, as well as make the project setup straightforward
- Linter tests are executed on each commit. It is possible to run them manually from the command line as well

**Playwright UI Automation Framework**:

- Multiple browsers support: Chrome, Firefox, Safari, as well as mobile versions
- Parametrized test execution: headed/headless run,  number of retries, number of workers for parallel execution, etc.
- Automatic async/await eliminates the need for waits
- Page Object Model used as the test design pattern. JS classes are used as page objects
- Extent HTML reports, as well as console reports, useful for CI/CD execution
- Screenshots on failure
- Video recordings on the first retry
- Trace recording for failed tests
- Integration with CI/CD
- many more

**Postman/Newman API Framework:**

- Possibility to run from the console
- HTML and console reports
- Random input data generation
- Dynamic variables
- Pre-request scripts
- Integration with CI/CD

## Installation

This project uses the **Node.js** library and **NPM** as a package manager, so install the latest version of the Node.js first - [Install Node.js](https://nodejs.org/en/download/).

After the installation, clone the GitHub repo and run the following command to install all required dependencies.

```bash
npm install
```

## Usage

```javascript
// run headed tests for desktop Chrome
npm run test:chrome 

// run headed tests for desktop Firefox
npm run test:firefox

// run headed tests for desktop Safari
npm run test:safari 

// run headed tests for mobile Chrome
npm run test:chrome:mobile

// run headed tests for mobile Safari
npm run test:safari:mobile

// run headed tests for all supported browsers
npm run test:all

// run headless tests for desktop Chrome
npm run test:headless:chrome

// run headless tests for desktop Firefox
npm run test:headless:firefox

// run headless tests for desktop Safari
npm run test:headless:safari

// run headless tests for mobile Chrome
npm run test:headless:chrome:mobile

// run headless tests for mobile Safari
npm run test:headless:safari:mobile

// run headless tests for all supported browsers
npm run test:headless:all

// run API tests
npm run test:api

// run API tests with HTML reporter
npm run test:api:save-report

// run ESLint test
npm run lint
```

## Project Structure

### UI Automation Framework (Playwright)

![image](https://user-images.githubusercontent.com/34889426/133845849-434edc89-53ce-4f0c-9352-8287995c449f.png)

**./e2e/** - root folder

-- **./e2e/pages/** - Page objects

-- **./e2e/test/** - Tests

-- **./e2e/test-data.js** - Test data

**./test-results/** - test reports and artifacts

### API Automation Framework (Postman, Newman)

![image](https://user-images.githubusercontent.com/34889426/133845882-ec0c2624-053c-4528-884e-68454297502d.png)

**./api/** - root folder

-- **./api/reports/** - HTML reports

### Other

It is possible to modify the run scripts from the **./package.JSON** file in the project root.

Playwright configs are located at **./playwright.config.js**.

**./.github/workflows/** - Github Actions (CI/CD) setup files

**./eslintrc** - ESLint setup file
