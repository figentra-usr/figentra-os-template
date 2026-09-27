import { describe, expect, it } from 'vitest';
import { figentraPlaywright } from '../../playwright.ts';

describe('@figentra/playwright-config', () => {
  it('sets CI-safe defaults a consuming config can spread and extend', () => {
    expect(figentraPlaywright.reporter).toBeDefined();
    expect(figentraPlaywright.use?.trace).toBe('on-first-retry');
    expect(typeof figentraPlaywright.retries).toBe('number');
  });
});
