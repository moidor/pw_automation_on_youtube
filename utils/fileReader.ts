import fs from 'fs';
import readline from 'readline';

export async function readFileStream(path: string): Promise<string[]> {
  const lines: string[] = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    lines.push(line);
  }

  return lines;
}