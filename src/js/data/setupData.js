const setSetupData = (password, userId, apiToken) => {
  PropertiesService.getScriptProperties().setProperty('password', password);
  PropertiesService.getScriptProperties().setProperty('userId', userId);
  PropertiesService.getScriptProperties().setProperty('apiToken', apiToken);

  const user = getUser();

  if (user.success === false) {
    throw new Error(user.message);
  }

  PropertiesService.getScriptProperties().setProperty('isSetupComplete', true);
};
