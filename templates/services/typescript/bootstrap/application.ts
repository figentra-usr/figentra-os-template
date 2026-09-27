import { config } from '../config/index.js';

/**
 * Application bootstrap boundary.
 *
 * This file intentionally contains only runtime composition concerns. Business
 * capabilities, APIs, workers, workflows, and other implementation details
 * must be provided by installed Figentra packages.
 */
export async function bootstrap(): Promise<void> {
  void config;

  // Figentra runtime initialization will be added here once the runtime
  // package is installed. The service remains intentionally empty until then.
}
