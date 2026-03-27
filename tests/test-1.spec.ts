import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('whale humpback');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await page.locator('.shortsLockupViewModelHostEndpoint').first().click();
  await expect(page.locator('yt-shorts-video-title-view-model')).toContainText('Humpback');
});