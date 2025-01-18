import {
  props_addQuestToQueue,
  PropsQuestQueueQuest,
} from '../../backend/services/properties/propsQuestQueueService';

export const page_addToQuestQueue = (questQueueQuest: PropsQuestQueueQuest) => {
  props_addQuestToQueue(questQueueQuest);
};
