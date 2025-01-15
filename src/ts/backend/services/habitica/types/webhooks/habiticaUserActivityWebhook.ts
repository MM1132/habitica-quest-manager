import { HabiticaGenericWebhook } from './commons';

interface HabiticaUserActivityWebhookOptions {
  petHatched: boolean;
  mountRaised: boolean;
  leveledUp: boolean;
}

export interface HabiticaUserActivityWebhook extends HabiticaGenericWebhook {
  type: 'userActivity';
  options: HabiticaUserActivityWebhookOptions;
}
