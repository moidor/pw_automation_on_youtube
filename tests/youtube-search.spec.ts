
import { errors } from '@playwright/test';
import { jsonFileReading } from '../fixtures/file.fixture';
import { test, expect } from '../fixtures/ytHomePage.fixture';
import { YouTubeHomePage } from '../pages/YouTubeHomePage';
import { YouTubeVideoPage } from '../pages/YouTubeVideoPage';

// Describe pour appeler le fichier texte via un stream et ensuite rechercher dans le test "search for a Playwright video" ?
// test.use({
//       locale: 'fr-FR',
//     });

test('search for a Playwright video', async ({ youtubePage }) => {
  await youtubePage.searchFor('Playwright tutorial');
  await youtubePage.expectResultsPage();
});

jsonFileReading('use data from JSON file', async ({ page, browser, scenarii }) => {
  const home = new YouTubeHomePage(page);
  const video = new YouTubeVideoPage(page, browser);

  const executeActions = async (video: YouTubeVideoPage, actions: any) => {
      for (const action of actions) {
        switch (action.type) {
          case 'closeBrowser':
            await video.closeBrowser();
            break;
          case 'fullscreen':
            await video.fullscreen();
            break;
          case 'mute':
            await video.mute();
            break;
          case 'play':
          case 'pause':
            await video.togglePlayPause(action.type);
            break;
          case 'setQuality':
            await video.setQuality(action.value);
            break;
          case 'timeout':
            await video.timeout(action.value);
            break;
    }};
  }

  for (const scenario of scenarii) {
    await home.goto();
    await home.searchFor(scenario.search);
    video.expectVideoToBePresentInResults(scenario.videoTitle);
    video.urlAssertionsInSearchResults();
    await video.openSearchedVideo(scenario.videoTitle);
    

    // MEME FONCTION MAIS AVEC UN MOT DANS LE JDD JSON POUR APPLIQUER UN TEMPS DE LECTURE DE 21 SECONDES (TESTER PUB 15 SECS DE SUBWAY)
    // const videoDurationSection = page.getByText(`:00 / ${scenario.duration}Live`);
    const videoDurationSection = page.locator('#movie_player').getByText(scenario.duration);
    const skipAdButton = page.getByRole('button', { name: 'Skip', exact: true });
    // const twoAdsdisplay = page.getByLabel('Sponsorisé', { exact: true });

    // Management of the ad before the selected video
    try {
      if (await videoDurationSection.isHidden()) {
        video.mute();
      };
      await Promise.race([
        videoDurationSection.waitFor({ state: 'visible', timeout: 30000 }),
        skipAdButton.waitFor({ state: 'visible', timeout: 30000 }),
        video.videoPlayerAssertions(scenario.videoTitle)
      ]);
    } catch {
      console.log('None detected video or ad.');
    }

    // Management of the displayed error message on the video which stops it or lets it continue with the method ".checkVideoError()"
    // Taking a snapshot (to implement later)
    const videoDurationInMs = video.durationToMilliseconds(scenario.duration);
    // const errorMessage = page.getByText('Something went wrong. Refresh');

    // Important : the test must last longer than the video
    test.setTimeout(await videoDurationInMs + 30000);
    const errorMessage = page.getByText('Something went wrong. Refresh');
    const watchForErrorDuringVideo = async (videoDurationInMs: number) => {
      try {
        await errorMessage.waitFor({
          state: 'visible',
          timeout: videoDurationInMs,
        });
        video.checkVideoError(page, scenario.videoTitle);
        // throw new Error('Error message displayed on the video player...');
      } catch (error) {
        if (error instanceof errors.TimeoutError) {
          return;
        }
        throw error;
      }
    };

    // Execution of the actions with the error message watcher and a 5-second timeout to make the video duration section visible
    await page.waitForTimeout(5000);
    if (await videoDurationSection.isVisible()) {
      console.log('The video duration section in the player is visible.');
      await Promise.all([
        executeActions(video, scenario.actions),
        watchForErrorDuringVideo(await videoDurationInMs)
      ]);
    } else if (await skipAdButton.isVisible()) {
      console.log('The skip button is visible and is going to be clicked.');
      await skipAdButton.click();
      await expect(skipAdButton).toBeHidden({ timeout: 2000 });
      await Promise.all([
        executeActions(video, scenario.actions),
        watchForErrorDuringVideo(await videoDurationInMs)
      ]);
    } else {
      console.log('None clear detected state, we finally execute the actions.');
      await Promise.all([
        executeActions(video, scenario.actions),
        watchForErrorDuringVideo(await videoDurationInMs)
      ]);
    }
    // await expect(errorMessage).toBeHidden();
  }
});
