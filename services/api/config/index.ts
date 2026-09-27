export { app } from './app.js';
export { auth } from './auth.js';
export { cache } from './cache.js';
export { database } from './database.js';
export { events } from './events.js';
export { logging } from './logging.js';
export { metrics } from './metrics.js';
export { queue } from './queue.js';
export { realtime } from './realtime.js';
export { scheduler } from './scheduler.js';
export { tracing } from './tracing.js';
export { workflow } from './workflow.js';

import { app } from './app.js';
import { auth } from './auth.js';
import { cache } from './cache.js';
import { database } from './database.js';
import { events } from './events.js';
import { logging } from './logging.js';
import { metrics } from './metrics.js';
import { queue } from './queue.js';
import { realtime } from './realtime.js';
import { scheduler } from './scheduler.js';
import { tracing } from './tracing.js';
import { workflow } from './workflow.js';

export const config = {
  app,
  auth,
  cache,
  database,
  events,
  logging,
  metrics,
  queue,
  realtime,
  scheduler,
  tracing,
  workflow,
} as const;
