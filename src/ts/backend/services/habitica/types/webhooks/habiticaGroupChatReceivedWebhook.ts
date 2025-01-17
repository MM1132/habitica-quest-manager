import { HabiticaGenericWebhook, HabiticaWebhookType } from './commons';
import { HabiticaGroupChatReceivedWebhookOptions } from './habiticaWebhookOptions';

export interface HabiticaGroupChatReceivedWebhook
  extends HabiticaGenericWebhook {
  type: HabiticaWebhookType.GROUP_CHAT_RECEIVED;
  options: HabiticaGroupChatReceivedWebhookOptions;
}
