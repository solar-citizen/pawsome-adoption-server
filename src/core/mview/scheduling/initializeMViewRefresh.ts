import { cronSchedules } from '../constants';
import { mviewManager } from '../di';

const { every12h } = cronSchedules;

export function initializeMViewRefresh() {
  mviewManager.registerView({ name: 'pets_with_details', schedule: every12h });
  return mviewManager;
}
