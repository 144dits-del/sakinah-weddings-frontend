import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('root on localhost is a dashboard entry, never an IP-octet invitation', () => {
  const root = source('../src/routes/index.tsx');
  assert.doesNotMatch(root, /host\.split\("\."\)\.length > 2/);
  assert.match(root, /sakinah_user_email/);
  assert.match(root, /to: "\/dashboard"/);
  assert.match(root, /to: "\/login"/);
});

test('dashboard preview uses the selected theme and not the legacy preview', () => {
  const dashboard = source('../src/routes/dashboard.tsx');
  assert.match(dashboard, /to="\/preview"\s+search=\{\{ theme: selectedTemplate \}\}/);
});

test('preview delegates to the section-based invitation renderer', () => {
  const preview = source('../src/routes/preview.tsx');
  assert.match(preview, /<MobileFrame[\s\S]*themeId=\{selectedTemplate\}[\s\S]*weddingData=\{wedding\}/);
  assert.doesNotMatch(preview, /Sabtu, 30 Mei 2026/);
});

test('wedding data has a blank owner default instead of a stranger’s demo', () => {
  const storage = source('../src/lib/dummy-data.ts');
  assert.match(storage, /return emptyWedding/);
  assert.match(storage, /getWeddingBySubdomain/);
});

test('unknown guest invitation refuses demo data', () => {
  const guest = source('../src/routes/kepada.$guest.tsx');
  assert.match(guest, /getWeddingBySubdomain/);
});

// Keep test output compact even when a large source file fails an assertion.

test('guest route does not fall back to a stranger’s demo invitation', () => {
  const guest = source('../src/routes/kepada.$guest.tsx');
  assert.doesNotMatch(guest, /detectedSubdomain = "di-ra"/);
  assert.match(guest, /MobileFrame/);
});

test('adapter does not inherit another couple’s private demo fields', () => {
  const adapter = source('../src/lib/dummy-invitation.ts');
  assert.doesNotMatch(adapter, /\.\.\.defaultDummyInvitation/);
  assert.match(adapter, /gallery: \{ images: \[\] \}/);
});

test('Sheila-inspired template is registered without importing their assets', () => {
  const theme = source('../src/lib/theme-resolver.ts');
  const catalog = source('../src/lib/theme-catalog.ts');
  assert.match(theme, /"t14"/);
  assert.match(catalog, /id: "t14"/);
  assert.doesNotMatch(source('../src/components/preview/SheilaEditorial.tsx'), /punakawandigital\.com/);
});
