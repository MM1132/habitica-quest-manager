import { HabiticaGenericWebhook } from './commons';

interface HabiticaQuestActivityWebhookOptions {
  questStarted: boolean;
  questFinished: boolean;
  questInvited: boolean;
}

export interface HabiticaQuestActivityWebhook extends HabiticaGenericWebhook {
  type: 'questActivity';
  options: HabiticaQuestActivityWebhookOptions;
}
