import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { text } from 'stream/consumers';

setup('handle cookies', async ({ page, context }) => {
  await page.goto('/');
  // Reject all cookies
    await page.getByRole('button', { name: 'Reject' }).click();
  // await page.getByLabel('Reject the use of cookies and other data for the purposes described').click();
  // Save
  await context.storageState({ path: '.auth/rejected-cookies.json' });
});