import { DBMViewLogger } from './logging/DBMViewLogger';
import { MViewManager } from './manager/MViewManager';

function createMViewManager(): MViewManager {
  return new MViewManager(new DBMViewLogger());
}

export const mviewManager = createMViewManager();
