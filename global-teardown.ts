const exec = require('child_process').execSync;
async function globalSetup() {
    await exec('npx xunit-viewer -r  test-results/results.xml -o test-results/results.html ')
  };
export default globalSetup;