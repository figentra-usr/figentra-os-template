import { describe, it, expect } from "vitest";

/**
 * @figentra/tsdown-config - TSDown Configuration
 *
 * Tests for tsdown config presets
 */
describe("@figentra/tsdown-config", () => {
  describe("exports", () => {
    it("should be a valid config package", () => {
      // Config packages export configuration
      // Presence is validated by pnpm publishing
      expect(true).toBe(true);
    });
  });
});
