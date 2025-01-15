export type HabiticaWebhookType =
  | 'taskActivity'
  | 'groupChatReceived'
  | 'userActivity'
  | 'questActivity';

export interface HabiticaGenericWebhook {
  type: HabiticaWebhookType;
  label: string;
  enabled: boolean;
  failures: number;
  url: string;
  options: any;
  id: string;
  createdAt: string;
  updatedAt: string;
  lastFailureAt: string;
}
