import { habitica_getUser } from '../habitica/habiticaUserService';

export const props_setSetupData = (
  password: string,
  userId: string,
  apiToken: string
) => {
  PropertiesService.getScriptProperties().setProperty('password', password);
  PropertiesService.getScriptProperties().setProperty('userId', userId);
  PropertiesService.getScriptProperties().setProperty('apiToken', apiToken);

  try {
    habitica_getUser();
  } catch (e: any) {
    throw new Error(e.message);
  }

  PropertiesService.getScriptProperties().setProperty(
    'questStartThreshold',
    '80'
  );

  PropertiesService.getScriptProperties().setProperty('authenticated', 'true');
};

export const getUserId = (): string | null => {
  return PropertiesService.getScriptProperties().getProperty('userId');
};
