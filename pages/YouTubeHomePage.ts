import { expect, Page } from '@playwright/test';

export class YouTubeHomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  searchInput() {
    return this.page.getByRole('combobox', { name: 'Search' });
  }

  async searchFor(text: string) {
    await this.searchInput().fill(text);
    await this.page.keyboard.press('Enter');
  }

  async expectResultsPage() {
    await expect(this.page).toHaveURL(/results/);
  }
}