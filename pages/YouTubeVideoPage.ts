import { expect, Page } from '@playwright/test';

export class YouTubeVideoPage{
  constructor(private page: Page) {}

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

  async play() {
    await this.page.getByRole('button', { name: 'Play' }).click();
  }

  async pause() {
    // await this.page.getByRole('button', { name: 'Pause' }).click();
    // await this.page.waitForTimeout(5000);
    // await this.page.getByRole('button', { name: 'Play keyboard shortcut k' }).click();
    await this.page.keyboard.press('k');
  }

  async setQuality(quality: string) {
    await this.page.getByLabel('YouTube Video Player').getByLabel('Settings').click();
    await this.page.getByRole('menuitem', { name: 'Quality' }).locator('div').first().click();
    await this.page.getByText(quality).click();
  }

  async autoplay() {
    await this.page.getByRole('button', { name: 'Autoplay' }).click();
  }

}