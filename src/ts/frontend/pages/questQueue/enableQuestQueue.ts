// When this function is called,

import { habitica_setWebhook } from '../../../backend/services/habitica/habiticaWebhookService';
import { HabiticaWebhookType } from '../../../backend/services/habitica/types/webhooks/commons';
import { HabiticaWebhook } from '../../../backend/services/habitica/types/webhooks/habiticaWebhook';
import { HabiticaQuestActivityWebhookOptions } from '../../../backend/services/habitica/types/webhooks/habiticaWebhookOptions';
import { props_getConstantData } from '../../../backend/services/properties/propsGlobalDataService';
import { getQuestQueueLabel } from './const';

// we are setting the quest queue webhook for the user
export const page_enableQuestQueue = (): HabiticaWebhook => {
  const { baseUrl } = props_getConstantData();

  const createdWebhook = habitica_setWebhook({
    label: getQuestQueueLabel(),
    url: baseUrl,
    type: HabiticaWebhookType.QUEST_ACTIVITY,
    options: {
      questFinished: true,
    } as HabiticaQuestActivityWebhookOptions,
  });

  return createdWebhook;
};
