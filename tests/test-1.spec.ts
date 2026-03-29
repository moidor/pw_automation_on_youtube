import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.youtube.com/results?search_query=baleine+%C3%A0+bosse');
  await page.getByTitle('Le chant de la baleine à bosse').click();
  await page.getByRole('button', { name: 'Pause keyboard shortcut k' }).click();
});