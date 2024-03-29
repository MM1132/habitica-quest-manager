import { getUser } from '../apiRequests';

export const setSetupData = (
  password: string,
  userId: string,
  apiToken: string
) => {
  PropertiesService.getScriptProperties().setProperty('password', password);
  PropertiesService.getScriptProperties().setProperty('userId', userId);
  PropertiesService.getScriptProperties().setProperty('apiToken', apiToken);

  const user = getUser();

  if (user.success === false) {
    throw new Error(user.message);
  }

  PropertiesService.getScriptProperties().setProperty(
    'questStartThreshold',
    '80'
  );

  PropertiesService.getScriptProperties().setProperty('authenticated', 'true');
};
