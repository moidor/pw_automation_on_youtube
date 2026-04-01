import { test as base } from '@playwright/test';
import { readFileStream } from '../utils/fileReader';
import fs from 'fs';
// Text file
type FileFixtures = {
  fileLines: string[];
};

export const fileReader = base.extend<FileFixtures>({
  fileLines: async ({}, use) => {
    const filePath = 'data/my-file.txt'; // adapte le chemin

    const lines = await readFileStream(filePath);

    await use(lines);
  },
});

// JSON
type Action =
  | { type: 'pause' }
  | { type: 'play' }
  | { type: 'mute' }
  | { type: 'fullscreen' }
  | { type: 'setQuality'; value: string };

type Scenario = {
  search: string;
  videoTitle: string;
  duration: string;
  actions: Action[];
};

type ScenarioFixtures = {
  scenarii: Scenario[];
};

export const jsonFileReading = base.extend<ScenarioFixtures>({
  scenarii: async ({}, use) => {
    const data = JSON.parse(
      fs.readFileSync('data/scenarii.json', 'utf-8')
    ) as Scenario[];

    await use(data);
  },
});