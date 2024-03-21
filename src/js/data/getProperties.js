const getQuestStartThreshold = () => {
  const thresholdProperty = PropertiesService.getScriptProperties().getProperty(
    'questStartThreshold'
  );

  return Number(thresholdProperty);
};

const getAuthenticated = () => {
  const authenticated =
    PropertiesService.getScriptProperties().getProperty('authenticated') ===
    'true';

  return authenticated;
};
