import { HabiticaGroupChatReceivedWebhook } from './habiticaGroupChatReceivedWebhook';
import { HabiticaQuestActivityWebhook } from './habiticaQuestActivityWebhook';
import { HabiticaTaskActivityWebhook } from './habiticaTaskActivityWebhook';
import { HabiticaUserActivityWebhook } from './habiticaUserActivityWebhook';

export type HabiticaWebhook =
  | HabiticaTaskActivityWebhook
  | HabiticaGroupChatReceivedWebhook
  | HabiticaUserActivityWebhook
  | HabiticaQuestActivityWebhook;
