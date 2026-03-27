import { test, expect } from '@playwright/test';
import fs from 'fs';

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

