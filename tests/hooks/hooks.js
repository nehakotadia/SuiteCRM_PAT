import 'dotenv/config';
import { createBdd } from 'playwright-bdd';

const { Before } = createBdd();

// Playwright's test runner already handles browser/context/page
// creation and teardown per test via fixtures, so we only need to
// navigate to the base URL before each scenario.
Before(async function ({ page }) {
  if (!process.env.BASE_URL) {
    throw new Error('BASE_URL is not set. Define it in .env');
  }

  await page.goto(process.env.BASE_URL);
});