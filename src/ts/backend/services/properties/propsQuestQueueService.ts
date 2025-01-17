export interface PropsQuestQueueQuest {
  questKey: string;
  playerId: string;
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
