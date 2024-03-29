export const getQuestStartThreshold = (): number => {
  const thresholdProperty = PropertiesService.getScriptProperties().getProperty(
    'questStartThreshold'
  );

  return Number(thresholdProperty);
};

export const getAuthenticated = (): boolean => {
  const authenticated =
    PropertiesService.getScriptProperties().getProperty('authenticated') ===
    'true';

  return authenticated;
};
