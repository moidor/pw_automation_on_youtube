import { test as base, expect } from '@playwright/test';
import { YouTubeHomePage } from '../pages/YouTubeHomePage';

type YouTubeFixtures = {
  youtubePage: YouTubeHomePage;
};

export const test = base.extend<YouTubeFixtures>({
  youtubePage: async ({ page }, use) => {
    const youtubePage = new YouTubeHomePage(page);
    await youtubePage.goto();
    await use(youtubePage);
  },
});

export { expect };