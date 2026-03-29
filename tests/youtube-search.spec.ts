
import { jsonFileReading } from '../fixtures/file.fixture';
import { test, expect } from '../fixtures/ytHomePage.fixture';
import { YouTubeHomePage } from '../pages/YouTubeHomePage';
import { YouTubeVideoPage } from '../pages/YouTubeVideoPage';

// Describe pour appeler le fichier texte via un stream et ensuite rechercher dans le test "search for a Playwright video" ?

test('search for a Playwright video', async ({ youtubePage }) => {
  await youtubePage.searchFor('Playwright tutorial');
  await youtubePage.expectResultsPage();
});

jsonFileReading('use data from JSON file', async ({ page, scenarii }) => {
  const home = new YouTubeHomePage(page);
  const video = new YouTubeVideoPage(page);

  for (const scenario of scenarii) {
    await home.goto();
    await home.searchFor(scenario.search);

    await video.openFirstVideo(scenario.videoTitle);

    for (const action of scenario.actions) {
      switch (action.type) {
        case 'pause':
          await video.pause();
          break;
        case 'play':
          await video.play();
          break;
        case 'mute':
          await video.mute();
          break;
        case 'fullscreen':
          await video.fullscreen();
          break;
        case 'setQuality':
          await video.setQuality(action.value);
          break;
      }
    }
  }
});