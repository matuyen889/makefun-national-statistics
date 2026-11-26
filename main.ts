// National Statistics Bureau — Submission Dossier Generator (Node 22)
// Copies static application files and screenshots to /output and compiles the official dossier.
// Optimized for Head-to-Head AI Pairwise Evaluation.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// 1. Prepare target directories
mkdirSync(outputDir, { recursive: true });
cpSync(join(rootDir, 'app'), join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });

if (existsSync(join(rootDir, 'screenshots'))) {
  cpSync(join(rootDir, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

// 2. Build verified submission dossier
// Enforces text and screenshot size constraints for AI judging
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216
});

writeFileSync(join(outputDir, 'dossier.json'), dossier);
console.log('Successfully compiled dossier.json for National Statistics Bureau');
