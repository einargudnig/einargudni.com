#!/usr/bin/env node
/**
 * Ensures `next-env.d.ts` exists before the typecheck gate runs.
 *
 * `next-env.d.ts` is gitignored and, per standard Next.js convention, is
 * normally generated as a side effect of `next dev` / `next build`. That
 * file is what pulls in `next/image-types/global`, which declares
 * `*.png` / `*.jpeg` (etc.) imports as valid modules. On a fresh checkout
 * (`npm ci` followed directly by `npm run typecheck`, with no prior
 * `next dev`/`next build`), the file doesn't exist yet, so `tsgo --noEmit`
 * fails with TS2307 on any image import.
 *
 * Next 14 has no lighter-weight public CLI command that only writes this
 * file (that landed later, as `next typegen`), so this script writes the
 * same content Next itself would generate for this project (app router
 * only, no pages dir, static image imports enabled - see
 * next.config.js/next/dist/lib/typescript/writeAppTypeDeclarations.js).
 *
 * If the file already exists (e.g. a real `next dev`/`next build` already
 * ran), it's left untouched.
 */
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'next-env.d.ts');

if (fs.existsSync(target)) {
	process.exit(0);
}

const content = [
	'/// <reference types="next" />',
	'/// <reference types="next/image-types/global" />',
	'',
	'// NOTE: This file should not be edited',
	'// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.'
].join('\n') + '\n';

fs.writeFileSync(target, content);
