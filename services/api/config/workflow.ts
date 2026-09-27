export interface WorkflowConfig {
  enabled: boolean;
  engine: string;
  driver: string;
  defaultTimeoutMs: number;
}

export const workflow: WorkflowConfig = {
  enabled: process.env.WORKFLOW_ENABLED !== 'false',
  engine: process.env.WORKFLOW_ENGINE ?? 'native',
  driver: process.env.WORKFLOW_DRIVER ?? 'memory',
  defaultTimeoutMs: Number(process.env.WORKFLOW_DEFAULT_TIMEOUT_MS ?? '300000'),
};
