import { Browser, expect, Page } from '@playwright/test';

export class YouTubeVideoPage{
  constructor(private page: Page, private browser: Browser) {}

  // Functions about the POM
  async checkVideoError(page: Page, videoTitle: string) {
    const errorMessage = page.getByText('Something went wrong. Refresh');
    const isVisible = await errorMessage.isVisible().catch(() => false);
    if (isVisible) {
      console.log(`
        ❌ YouTube Error: "Something went wrong. Refresh..."
        ━━━━━━━━━━━━━━━━━━
        🎬 Video title:
        ➡️  ${videoTitle}`);
      // The test continues in spite of the detected error
      await expect.soft(errorMessage).toBeVisible();
      return true;
    }
    return false;
  }

  async durationToMilliseconds(duration: string) {
    const parts = duration.split(':').map(Number);
    if (parts.some(Number.isNaN)) {
      throw new Error(`Invalid duration format: ${duration}`);
    }
    let totalSeconds = 0;
    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      totalSeconds = minutes * 60 + seconds;
    } else if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    } else {
      throw new Error(`Unsupported duration format: ${duration}`);
    }
    return totalSeconds * 1000;
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async fullscreen() {
    await this.page.keyboard.press('f');
  }

  async mute() {
    await this.page.keyboard.press('m');
  }

  async openFirstVideo(videoTitle: string) {
    await this.page.getByTitle(videoTitle).click();
  }

  async openVideoRandomly() {
    // Looping over the first five results to get a random element
    // const results = await page.locator('#dismissible').all();
    // Display in the console each video's title
    const firstFiveResultsText = (await this.page.locator('#items #dismissible #video-title').allInnerTexts()).slice(0,5);
    expect(firstFiveResultsText).not.toBeNull();
    console.log(firstFiveResultsText);
  
    // Select a random value in the list
    const firstFiveResults = (await this.page.locator('#items #dismissible #video-title').all()).slice(0,5);
    const elementsList: any = Object.keys(firstFiveResults);
    const randomIndex = Math.floor(Math.random() * elementsList.length);
    const randomObject = firstFiveResults[elementsList[randomIndex]];
    const randomObjectName = await randomObject.innerText();
    console.log(`Name of the selected video: '${randomObjectName}'.`);
    await expect(randomObject).not.toBeEmpty();
    await randomObject.click();
  }

  async setQuality(quality: string) {
    await this.page.getByLabel('YouTube Video Player').getByLabel('Settings').click();
    await this.page.getByRole('menuitem', { name: 'Quality' }).locator('div').first().click();
    if (quality) {
      await this.page.getByText(quality).click();
    } else {
      console.log(`This quality '${quality}' does not exist for this video. The 144p quality is now applied.`);
      await this.page.getByText('144p').click();
    }
  }

  async timeout(timeoutValue: number) {
    await this.page.waitForTimeout(timeoutValue);
    console.log(`Timeout of ${timeoutValue} seconds.`);
  }

  async togglePlayPause(action: string) {
    if (action === 'play') {
      await this.page.keyboard.press('k');
    } else if (action === 'pause') {
      await this.page.keyboard.press('k');
    }
  }

  // ASSERTIONS :
  // Assertions about checking the presence of searched video on the results page
  async expectVideoToBePresentInResults(videoTitle: string) {
    const videoCard = this.page.getByTitle(videoTitle);
    await expect(videoCard).toBeVisible();
  }

  // Assertions about video player
  async expectVideoPageOpened() {
    await expect(this.page).toHaveURL(/watch/);
  }

  async expectVideoTitleVisible(title: string) {
    // await expect(this.page.getByText(title, { exact: false })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: title, exact: false })).toBeVisible();
  }

  async expectPlayerVisible() {
    const player = this.page.locator('#movie_player');
    await expect(player).toBeVisible();
  }

  // Assertions about the URL containing the search query and results string
  async expectResultsPage() {
    await expect(this.page).toHaveURL('/\/results/');
  }

  async expectSearchTermInUrl() {
    await expect(this.page).toHaveURL(/search_query=/);
  }

}