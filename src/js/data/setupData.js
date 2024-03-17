const setSetupData = (password, userId, apiToken) => {
  PropertiesService.getScriptProperties().setProperty('password', password);
  PropertiesService.getScriptProperties().setProperty('userId', userId);
  PropertiesService.getScriptProperties().setProperty('apiToken', apiToken);

  PropertiesService.getScriptProperties().setProperty('isSetupComplete', true);
};
