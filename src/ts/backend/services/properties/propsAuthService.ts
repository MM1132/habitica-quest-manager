export const props_getAuthenticated = (): boolean => {
  const authenticated =
    PropertiesService.getScriptProperties().getProperty('authenticated') ===
    'true';

  return authenticated;
};
