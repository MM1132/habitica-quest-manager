export interface PropsQuestQueueQuest {
  questKey: string;
  userId: string;
}

export const props_getQuestQueue = (): PropsQuestQueueQuest[] => {
  const questQueueString =
    PropertiesService.getScriptProperties().getProperty('questQueue') || '[]';

  const questQueueData = JSON.parse(questQueueString) as PropsQuestQueueQuest[];

  return questQueueData;
};

export const props_setQuestQueue = (data: PropsQuestQueueQuest[]) => {
  const questQueueStringData = JSON.stringify(data);

  PropertiesService.getScriptProperties().setProperty(
    'questQueue',
    questQueueStringData
  );
};

export const props_addQuestToQueue = (data: PropsQuestQueueQuest) => {
  const questQueue = props_getQuestQueue();

  questQueue.push(data);

  props_setQuestQueue(questQueue);
};

export const props_deleteQuestQueue = () => {
  PropertiesService.getScriptProperties().deleteProperty('questQueue');
};
