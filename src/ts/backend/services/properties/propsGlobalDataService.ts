import { SCRIPT_NAME, SCRIPT_VERSION } from '../../../index';

export interface PROPS_ConstantData {
  scriptName: string;
  scriptVersion: string;
  baseUrl: string;
}

export const props_getConstantData = (): PROPS_ConstantData => {
  return {
    scriptName: SCRIPT_NAME,
    scriptVersion: SCRIPT_VERSION,
    baseUrl: `${ScriptApp.getService().getUrl()}`,
  };
};
