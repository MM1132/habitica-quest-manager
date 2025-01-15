import { habitica_getParty } from '../../../backend/services/habitica/habiticaGroupService';
import { habitica_getUser } from '../../../backend/services/habitica/habiticaUserService';
import { habitica_getWebhooks } from '../../../backend/services/habitica/habiticaWebhookService';
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

const getQuestQueueLabel = (): string => {
  const { scriptName, scriptVersion } = props_getConstantData();

  return `${scriptName}/${scriptVersion}/questQueue`;
};

const QUEST_QUEUE_WEBHOOK_LABEL = getQuestQueueLabel();

export const page_getQuestQueueData = (): PageQuestQueueData => {
  const webhooks = habitica_getWebhooks();
  const user = habitica_getUser();
  const party = habitica_getParty(user.party._id);

  const isPartyLeader = party.leader.id === user.id;

  // If the quest queue hook does not exist, we simply return false
  if (
    !webhooks.some((webhook) => webhook.label === QUEST_QUEUE_WEBHOOK_LABEL)
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

export const page_enableQuestQueue = () => {};
