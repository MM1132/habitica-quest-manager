import { HabiticaGenericWebhook, HabiticaWebhookType } from './commons';
import { HabiticaUserActivityWebhookOptions } from './habiticaWebhookOptions';

export interface HabiticaUserActivityWebhook extends HabiticaGenericWebhook {
  type: HabiticaWebhookType.USER_ACTIVITY;
  options: HabiticaUserActivityWebhookOptions;
}
