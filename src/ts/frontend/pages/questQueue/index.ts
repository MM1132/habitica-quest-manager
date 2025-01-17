import { habitica_getParty } from '../../../backend/services/habitica/habiticaGroupService';
import { habitica_getUser } from '../../../backend/services/habitica/habiticaUserService';
import { habitica_getWebhooks } from '../../../backend/services/habitica/habiticaWebhookService';
import { HabiticaWebhookType } from '../../../backend/services/habitica/types/webhooks/commons';
import { HabiticaWebhook } from '../../../backend/services/habitica/types/webhooks/habiticaWebhook';
import { props_getConstantData } from '../../../backend/services/properties/propsGlobalDataService';

interface PageQuestQueueData {
  questQueueActive: boolean;
  isPartyLeader: boolean;
  data?: {
    mainSection: {
      webhooks: HabiticaWebhook[];
    };
  };
}

export const page_getQuestQueueData = (): PageQuestQueueData => {
  const webhooks = habitica_getWebhooks();
  const user = habitica_getUser();
  const party = habitica_getParty(user.party._id);
  const { baseUrl } = props_getConstantData();

  const isPartyLeader = party.leader.id === user.id;

  // If the quest queue hook does not exist, we simply return false
  // The `isPartyLeader` will determine whether or not the user
  // ...will be able to enable the quest queue
  if (
    !webhooks.some(
      (webhook) =>
        webhook.url === baseUrl &&
        webhook.type === HabiticaWebhookType.QUEST_ACTIVITY
    )
  ) {
    return { questQueueActive: false, isPartyLeader };
  }

  return {
    questQueueActive: true,
    isPartyLeader,
    data: {
      mainSection: { webhooks },
    },
  };
};
