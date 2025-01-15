import { HabiticaGenericWebhook } from './commons';

interface HabiticaTaskActivityWebhookOptions {
  created: boolean;
  updated: boolean;
  deleted: boolean;
  scored: boolean;
}

export interface HabiticaTaskActivityWebhook extends HabiticaGenericWebhook {
  type: 'taskActivity';
  options: HabiticaTaskActivityWebhookOptions;
}
