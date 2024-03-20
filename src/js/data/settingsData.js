const updateSettings = (password, questStartThreshold) => {
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
