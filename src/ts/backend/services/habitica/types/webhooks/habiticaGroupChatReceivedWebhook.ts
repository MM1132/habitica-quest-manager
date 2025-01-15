import { HabiticaGenericWebhook } from './commons';

interface HabiticaGroupChatReceivedWebhookOptions {
  groupId: string;
}

export interface HabiticaGroupChatReceivedWebhook
  extends HabiticaGenericWebhook {
  type: 'groupChatReceived';
  options: HabiticaGroupChatReceivedWebhookOptions;
}
