import { getUser } from '../api/user/apiUserService';

export const setSetupData = (
  password: string,
  userId: string,
  apiToken: string
) => {
  PropertiesService.getScriptProperties().setProperty('password', password);
  PropertiesService.getScriptProperties().setProperty('userId', userId);
  PropertiesService.getScriptProperties().setProperty('apiToken', apiToken);

  try {
    getUser();
  } catch (e: any) {
    throw new Error(e.message);
  }

  PropertiesService.getScriptProperties().setProperty(
    'questStartThreshold',
    '80'
  );

  PropertiesService.getScriptProperties().setProperty('authenticated', 'true');
};
