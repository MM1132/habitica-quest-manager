export interface AQM_Settings {
  questStartThreshold: number;
}

export const props_updateSettings = (
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

export const props_getQuestStartThreshold = (): number => {
  const thresholdProperty = PropertiesService.getScriptProperties().getProperty(
    'questStartThreshold'
  );

  return Number(thresholdProperty);
};

export const props_getQuestManagerSettings = (): AQM_Settings => {
  const threshold = props_getQuestStartThreshold();

  return {
    questStartThreshold: threshold,
  };
};
