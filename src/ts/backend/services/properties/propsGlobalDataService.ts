import { SCRIPT_NAME, SCRIPT_VERSION } from '../../../index';

export interface PROPS_ConstantData {
  scriptName: string;
  scriptVersion: string;
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
    scriptName: SCRIPT_NAME,
    scriptVersion: SCRIPT_VERSION,
    baseUrl: `${ScriptApp.getService().getUrl()}`,
    userId: USER_ID,
    profileName: PROFILE_NAME,
  };
};
