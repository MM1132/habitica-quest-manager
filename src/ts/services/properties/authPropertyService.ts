export const getAuthenticated = (): boolean => {
  const authenticated =
    PropertiesService.getScriptProperties().getProperty('authenticated') ===
    'true';

  return authenticated;
};
