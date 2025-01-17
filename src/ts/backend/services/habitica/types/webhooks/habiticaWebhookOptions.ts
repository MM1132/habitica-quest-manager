export interface HabiticaGroupChatReceivedWebhookOptions {
  groupId: string;
}

export interface HabiticaQuestActivityWebhookOptions {
  questStarted: boolean;
  questFinished: boolean;
  questInvited: boolean;
}

export interface HabiticaTaskActivityWebhookOptions {
  created: boolean;
  updated: boolean;
  deleted: boolean;
  scored: boolean;
}

export interface HabiticaUserActivityWebhookOptions {
  petHatched: boolean;
  mountRaised: boolean;
  leveledUp: boolean;
}

export type HabiticaWebhookOptions =
  | HabiticaGroupChatReceivedWebhookOptions
  | HabiticaQuestActivityWebhookOptions
  | HabiticaTaskActivityWebhookOptions
  | HabiticaUserActivityWebhookOptions;
