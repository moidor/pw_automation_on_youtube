import { Browser, expect, Page } from '@playwright/test';
import { Context } from 'vm';

export class YouTubeVideoPage{
  constructor(private page: Page, private browser: Browser) {}

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
    await this.page.getByText(quality).click();
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

  async whenStoppingVideo() {

  }

}