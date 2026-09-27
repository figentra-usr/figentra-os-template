// Purpose: enforce Conventional Commits (AGENTS.md, CONTRIBUTING.md); run by the commit-msg hook
// (.husky/) and by CI on PR titles/commits.
// Owner: release-operations
import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
};

export default config;
