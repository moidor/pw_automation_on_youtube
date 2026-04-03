
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
        }
      }
    };

  for (const scenario of scenarii) {
    await home.goto();
    await home.searchFor(scenario.search);
    await video.openFirstVideo(scenario.videoTitle);
    video.expectPlayerVisible();
    video.expectVideoTitleVisible(scenario.videoTitle);

    const videoDurationSection = page.getByText(`:00 / ${scenario.duration}Live`);
    const skipAdButton = page.getByRole('button', { name: 'Skip', exact: true });
    // const twoAdsdisplay = page.getByLabel('Sponsorisé', { exact: true });

    // Management of the ad before the selected video
    try {
      await Promise.race([
        videoDurationSection.waitFor({ state: 'visible', timeout: 30000 }),
        skipAdButton.waitFor({ state: 'visible', timeout: 30000 }),
      ]);
    } catch {
      console.log('None detected video or ad.');
    }

    // Management of the displayed error message on the video which stops it
    // Taking a snapshot (to implement later)
      // throw new Error(`The following error message appeared and stopped the video watching : ${errorMessage}`);
    const videoDurationInMs = video.durationToMilliseconds(scenario.duration);
    // const errorMessage = page.getByText('Something went wrong. Refresh');

    // important : le test doit durer plus longtemps que la vidéo
    test.setTimeout(await videoDurationInMs + 30000);
    const watchForErrorDuringVideo = async (videoDurationInMs: number) => {
      const errorMessage = page.getByText('Something went wrong. Refresh');

      try {
        await errorMessage.waitFor({
          state: 'visible',
          timeout: videoDurationInMs,
        });

        throw new Error('Error message displayed on the video player...');
      } catch (error) {
        if (error instanceof errors.TimeoutError) {
          return;
        }
        throw error;
      }
  };

    // Execution of the actions with the error message watcher
    if (await videoDurationSection.isVisible()) {
      // video.expectResultsPage();
      // video.expectSearchTermInUrl();      
      await Promise.all([
        executeActions(video, scenario.actions),
        watchForErrorDuringVideo(await videoDurationInMs)
      ]);
    } else if (await skipAdButton.isVisible()) {
      // video.expectResultsPage();
      // video.expectSearchTermInUrl();
      await skipAdButton.click();
      await Promise.all([
        executeActions(video, scenario.actions),
        watchForErrorDuringVideo(await videoDurationInMs)
      ]);
    } else {
      console.log('None clear detected state, we finally execute the actions.');
      // video.expectResultsPage();
      // video.expectSearchTermInUrl();
      await Promise.all([
        executeActions(video, scenario.actions),
        watchForErrorDuringVideo(await videoDurationInMs)
      ]);
    }
  }
});