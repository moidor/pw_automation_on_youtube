import { test, expect } from '@playwright/test';
import fs from 'fs';
import { fileReader, jsonFileReading } from '../fixtures/file.fixture';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('user going on YouTube', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/youtube/);
});

test('user searching on YouTube', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/youtube/);
  await page.getByRole('combobox', { name: 'Search' }).click()
  await page.getByRole('combobox', { name: 'Search' }).fill('whale humpback');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  
  // await page.keyboard.press('Enter');
});

fileReader('use data from text file', async ({ fileLines }) => {
  console.log(fileLines);

  // Exemple concret
  for (const line of fileLines) {
    console.log('Traitement:', line);
  }
});

// jsonFileReading('use data from JSON file', async ({ page, scenarios }) => {
//   const home = new YouTubeHomePage(page);
//   const video = new YouTubeVideoPage(page);

//   for (const scenario of scenarios) {
//     await home.goto();
//     await home.searchFor(scenario.search);

//     await video.openFirstVideo();

//     for (const action of scenario.actions) {
//       switch (action.type) {
//         case 'pause':
//           await video.pause();
//           break;
//         case 'play':
//           await video.play();
//           break;
//         case 'mute':
//           await video.mute();
//           break;
//         case 'fullscreen':
//           await video.fullscreen();
//           break;
//         case 'setQuality':
//           await video.setQuality(action.value);
//           break;
//       }
//     }
//   }
// });
