import {
  habitica_deleteWebhook,
  habitica_getWebhooks,
} from '../../../backend/services/habitica/habiticaWebhookService';
import { HabiticaWebhookType } from '../../../backend/services/habitica/types/webhooks/commons';
import { props_getConstantData } from '../../../backend/services/properties/propsGlobalDataService';

export const page_disableQuestQueue = () => {
  // Firstly, find the webhook that gives us the quest queue
  const { baseUrl } = props_getConstantData();
  const webhooks = habitica_getWebhooks();

  // Sort out the Quest Queue webhook
  const [questQueueWebhook] = webhooks.filter(
    (webhook) =>
      webhook.type === HabiticaWebhookType.QUEST_ACTIVITY &&
      webhook.url === baseUrl
  );

  // Check if the webhook was found
  // And send request to get rid of it
  if (questQueueWebhook) {
    habitica_deleteWebhook(questQueueWebhook.id);
  }
};
