import { habitica_getParty } from '../../../backend/services/habitica/habiticaGroupService';
import {
  habitica_getUser,
  habitica_getUserById,
} from '../../../backend/services/habitica/habiticaUserService';
import { habitica_getWebhooks } from '../../../backend/services/habitica/habiticaWebhookService';
import { HabiticaUser } from '../../../backend/services/habitica/types/habiticaUser';
import { HabiticaWebhookType } from '../../../backend/services/habitica/types/webhooks/commons';
import { HabiticaWebhook } from '../../../backend/services/habitica/types/webhooks/habiticaWebhook';
import { props_getConstantData } from '../../../backend/services/properties/propsGlobalDataService';
import {
  props_getQuestQueue,
  PropsQuestQueueQuest,
} from '../../../backend/services/properties/propsQuestQueueService';
import { translateQuestByKey } from '../../quests/questService';
import { TranslatedQuest } from '../../quests/types';

interface PageQuestQueueQuest extends PropsQuestQueueQuest, TranslatedQuest {
  user: HabiticaUser;
}

interface PageQuestQueueData {
  questQueueActive: boolean;
  isPartyLeader: boolean;
  data?: {
    quests: PageQuestQueueQuest[];
  };
}

export const isQuestFinishedWebhookTurnedOn = (
  webhooks: HabiticaWebhook[],
  baseUrl: string
) => {
  return webhooks.some(
    (webhook) =>
      webhook.url === baseUrl &&
      webhook.type === HabiticaWebhookType.QUEST_ACTIVITY &&
      webhook.options.questFinished === true
  );
};

export const page_getQuestQueueData = (): PageQuestQueueData => {
  const webhooks = habitica_getWebhooks();
  const user = habitica_getUser();
  const party = habitica_getParty(user.party._id);
  const { baseUrl } = props_getConstantData();

  const isPartyLeader = party.leader.id === user.id;

  // If the quest queue hook does not exist, we simply return false
  // The `isPartyLeader` will determine whether or not the user
  // ...will be able to enable the quest queue
  if (!isQuestFinishedWebhookTurnedOn(webhooks, baseUrl)) {
    return { questQueueActive: false, isPartyLeader };
  }

  // Get the quests
  const requestedAqmUsers: Record<string, HabiticaUser> = {};

  const quests = props_getQuestQueue();
  const assembledQuests: PageQuestQueueQuest[] = quests.map((quest) => {
    const translatedQuest = translateQuestByKey(quest.questKey);

    if (!(quest.userId in requestedAqmUsers)) {
      const aqmUser = habitica_getUserById(quest.userId);
      requestedAqmUsers[quest.userId] = aqmUser;
    }

    return {
      ...quest,
      ...translatedQuest,
      user: requestedAqmUsers[quest.userId],
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
