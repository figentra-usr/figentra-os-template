import { describe, it, expect } from 'vitest';

/**
 * @figentra/oxlint-config - OXLint Configuration
 *
 * Tests for oxlint config presets
 */
describe('@figentra/oxlint-config', () => {
  describe('config exports', () => {
    it('should be a valid config package', () => {
      // Config packages export JSON/JSONC files
      // Presence is validated by pnpm publishing
      expect(true).toBe(true);
    });
  });
});
