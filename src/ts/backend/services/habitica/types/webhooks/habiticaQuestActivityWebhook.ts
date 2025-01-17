import { HabiticaGenericWebhook, HabiticaWebhookType } from './commons';
import { HabiticaQuestActivityWebhookOptions } from './habiticaWebhookOptions';

export interface HabiticaQuestActivityWebhook extends HabiticaGenericWebhook {
  type: HabiticaWebhookType.QUEST_ACTIVITY;
  options: HabiticaQuestActivityWebhookOptions;
}
