import puppeteer, { Page, Browser } from 'puppeteer';

describe.skip('Login Page Test', () => {
  let browser: Browser;

  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();

    page = await browser.newPage();
  });

  it('should visit the login page and verify the login button', async () => {
    await page.goto('https://the-internet.herokuapp.com/login');

    // Custom matcher to check if an element exists
    expect.extend({
      toExist: (received) => {
        const pass = received !== null;

        if (pass) {
          return {
            message: () => `Expected element not to exist, but it does.`,

            pass: true,
          };
        } else {
          return {
            message: () => `Expected element to exist, but it does not.`,

            pass: false,
          };
        }
      },
    });

    // Use Puppeteer to select the login button

    const loginButton = await page.$('#login > button');

    // Verify if the login button exists using the custom matcher

    expect(loginButton).toExist();

    // Take a screenshot for reference (optional)

    // await page.screenshot({ path: 'login-page.png' });
  }, 10000); // Set a timeout of 10 seconds (adjust as needed)

  afterAll(async () => {
    await browser.close();
  });
});
