
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

jsonFileReading('use data from JSON file', async ({ page, scenarii }) => {
  const home = new YouTubeHomePage(page);
  const video = new YouTubeVideoPage(page);

  const executeActions = async (video: YouTubeVideoPage, actions: any) => {
      for (const action of actions) {
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
    };

  for (const scenario of scenarii) {
    await home.goto();
    await home.searchFor(scenario.search);
    await video.openFirstVideo(scenario.videoTitle);

    const videoDurationSection = page.getByText(`:00 / ${scenario.duration}Live`);
    const skipAdButton = page.getByRole('button', { name: 'Skip', exact: true });
    // const twoAdsdisplay = page.getByLabel('Sponsorisé', { exact: true });
    try {
      await Promise.race([
        videoDurationSection.waitFor({ state: 'visible', timeout: 30000 }),
        skipAdButton.waitFor({ state: 'visible', timeout: 30000 }),
      ]);
    } catch {
      console.log('Ni durée vidéo ni pub détectée dans le délai');
    }

    if (await videoDurationSection.isVisible()) {
      await executeActions(video, scenario.actions);
    } else if (await skipAdButton.isVisible()) {
      await skipAdButton.click();
      await executeActions(video, scenario.actions);
    } else {
      console.log('None clear detected state, we finally execute the actions.');
      await executeActions(video, scenario.actions);
    }
  }
});