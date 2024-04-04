export interface QuestManagerSettings {
  questStartThreshold: number;
}

export const updateSettings = (
  password: string,
  questStartThreshold: string
) => {
  const savedPassword =
    PropertiesService.getScriptProperties().getProperty('password');

  if (savedPassword !== password) {
    throw new Error('Invalid password');
  }

  PropertiesService.getScriptProperties().setProperty(
    'questStartThreshold',
    questStartThreshold
  );
};

export const getQuestStartThreshold = (): number => {
  const thresholdProperty = PropertiesService.getScriptProperties().getProperty(
    'questStartThreshold'
  );

  return Number(thresholdProperty);
};

export const getQuestManagerSettings = (): QuestManagerSettings => {
  const threshold = getQuestStartThreshold();

  return {
    questStartThreshold: threshold,
  };
};
