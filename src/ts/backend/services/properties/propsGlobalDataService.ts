export interface PROPS_ConstantData {
  scriptName: string;
  scriptVersion: string;
  authorId: string;
  baseUrl: string;
  userId: string;
  profileName: string;
}

export const props_getConstantData = (): PROPS_ConstantData => {
  const USER_ID =
    PropertiesService.getScriptProperties().getProperty('userId') || '';

  const PROFILE_NAME =
    PropertiesService.getScriptProperties().getProperty('profileName') || '';

  return {
    scriptName: 'Awesome Quest Manager',
    scriptVersion: 'v1.5 dev',
    authorId: '90c987f2-cf51-442f-b932-3c4194d56ad6',
    baseUrl: `${ScriptApp.getService().getUrl()}`,
    userId: USER_ID,
    profileName: PROFILE_NAME,
  };
};
