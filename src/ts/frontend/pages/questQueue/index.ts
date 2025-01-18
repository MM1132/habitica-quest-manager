import { habitica_getParty } from '../../../backend/services/habitica/habiticaGroupService';
import { habitica_getUser } from '../../../backend/services/habitica/habiticaUserService';
import { habitica_getWebhooks } from '../../../backend/services/habitica/habiticaWebhookService';
import { HabiticaWebhookType } from '../../../backend/services/habitica/types/webhooks/commons';
import { props_getConstantData } from '../../../backend/services/properties/propsGlobalDataService';
import {
  props_getQuestQueue,
  PropsQuestQueueQuest,
} from '../../../backend/services/properties/propsQuestQueueService';
import { translateQuestByKey } from '../../quests/questService';
import { TranslatedQuest } from '../../quests/types';

interface PageQuestQueueQuest extends PropsQuestQueueQuest, TranslatedQuest {}

interface PageQuestQueueData {
  questQueueActive: boolean;
  isPartyLeader: boolean;
  data?: {
    quests: PageQuestQueueQuest[];
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

  // Get the quests
  const quests = props_getQuestQueue();
  const assembledQuests: PageQuestQueueQuest[] = quests.map((quest) => {
    const translatedQuest = translateQuestByKey(quest.questKey);

    return {
      ...quest,
      ...translatedQuest,
    };
  });

  return {
    questQueueActive: true,
    isPartyLeader,
    data: {
      quests: assembledQuests,
    },
  };
};
