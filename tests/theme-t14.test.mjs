import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('t14 has its own catalog entry, resolver config and editorial frame', () => {
  const catalog = source('../src/lib/theme-catalog.ts');
  const resolver = source('../src/lib/theme-resolver.ts');
  const frame = source('../src/components/preview/MobileFrame.tsx');
  const styles = source('../src/styles/theme-tokens.css');
  assert.match(catalog, /id: "t14"/);
  assert.match(resolver, /"t14":\s*\{/);
  assert.match(styles, /\[data-theme="t14"\]/);
  assert.match(frame, /themeConfig\.id === "t14"/);
  assert.match(frame, /<SheilaEditorial/);
});

test('editorial design is original and uses invitation data, not a hardcoded couple or borrowed assets', () => {
  const editorial = source('../src/components/preview/SheilaEditorial.tsx');
  assert.match(editorial, /data\.couple/);
  assert.match(editorial, /couple\.bride/);
  assert.match(editorial, /couple\.groom/);
  assert.match(editorial, /data\.events/);
  assert.match(editorial, /onOpenInvitation/);
  assert.doesNotMatch(editorial, /punakawandigital|sheila-ridwan|Salma|Rizal|Ridwan/i);
});
