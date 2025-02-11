import { habitica_sendPrivateMessage } from '../habitica/habiticaSendPrivateMessageService';
import { habitica_getUser } from '../habitica/habiticaUserService';
import { props_getConstantData } from './propsGlobalDataService';

export const props_setSetupData = (
  password: string,
  userId: string,
  apiToken: string
) => {
  PropertiesService.getScriptProperties().setProperty('password', password);
  PropertiesService.getScriptProperties().setProperty('userId', userId);
  PropertiesService.getScriptProperties().setProperty('apiToken', apiToken);

  try {
    const habiticaUser = habitica_getUser();
    PropertiesService.getScriptProperties().setProperty(
      'profileName',
      habiticaUser.profile.name
    );
    // Here, if we managed to successfully get the user, it must be a success
    // Therefore, we can now send a message to Kanguste about the successful installation
    const { authorId, scriptVersion } = props_getConstantData();

    habitica_sendPrivateMessage({
      message: `Hello Robert! Just wanted to let you know that I am using your *Awesome Quest Manager* now. The *${scriptVersion}* in particular. Thank you so much :)`,
      toUserId: authorId,
    });
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
