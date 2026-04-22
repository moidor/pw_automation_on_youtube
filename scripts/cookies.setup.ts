import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://youtube.com');

  // ⛔ Gestion cookies manuelle (plus fiable)
  try {
    const rejectButton = page.getByRole('button', { name: /reject/i });
    await rejectButton.click({ timeout: 5000 });
  } catch {
    console.log('No cookie banner detected');
  }

  // 💾 Sauvegarde du storageState
  await context.storageState({ path: '.auth/rejected-cookies.json' });

  console.log('Auth state saved');

  await browser.close();
})();