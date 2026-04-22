import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { text } from 'stream/consumers';

setup('handle cookies', async ({ page, context }) => {
  // It will automatically create the missing folder ".auth"
  const pathRejectCookiesFile = '.auth/rejected-cookies.json';

  await page.goto('/');
  // Reject all cookies
  await page.getByRole('button', { name: 'Reject' }).click();
  // const rejectCookiesButton = page.getByRole('button', { name: 'Reject' });
  // if (await rejectCookiesButton.isVisible().catch(() => false)) {
  //   rejectCookiesButton.click();
  // }
  // Save cookies rejection
  await context.storageState({ path: pathRejectCookiesFile });
});