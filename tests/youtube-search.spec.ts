import { test, expect } from '../fixtures/ytHomePage.fixture';

// Describe pour appeler le fichier texte via un stream et ensuite rechercher dans le test "search for a Playwright video" ?

test('search for a Playwright video', async ({ youtubePage }) => {
  await youtubePage.searchFor('Playwright tutorial');
  await youtubePage.expectResultsPage();
});