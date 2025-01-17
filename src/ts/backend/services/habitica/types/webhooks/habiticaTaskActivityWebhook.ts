import { HabiticaGenericWebhook, HabiticaWebhookType } from './commons';
import { HabiticaTaskActivityWebhookOptions } from './habiticaWebhookOptions';

export interface HabiticaTaskActivityWebhook extends HabiticaGenericWebhook {
  type: HabiticaWebhookType.TASK_ACTIVITY;
  options: HabiticaTaskActivityWebhookOptions;
}
