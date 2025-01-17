import { HabiticaWebhookOptions } from './habiticaWebhookOptions';

export enum HabiticaWebhookType {
  TASK_ACTIVITY = 'taskActivity',
  GROUP_CHAT_RECEIVED = 'groupChatReceived',
  USER_ACTIVITY = 'userActivity',
  QUEST_ACTIVITY = 'questActivity',
}

export interface HabiticaGenericWebhook {
  type: HabiticaWebhookType;
  label: string;
  enabled: boolean;
  failures: number;
  url: string;
  options: HabiticaWebhookOptions;
  id: string;
  createdAt: string;
  updatedAt: string;
  lastFailureAt: string;
}
