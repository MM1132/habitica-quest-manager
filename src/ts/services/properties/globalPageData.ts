import { SCRIPT_NAME, SCRIPT_VERSION } from '../local/constants';

export interface GlobalPageData {
  scriptName: string;
  scriptVersion: string;
  mainPageUrl: string;
}

export const getGlobalPageData = (): GlobalPageData => {
  return {
    scriptName: SCRIPT_NAME,
    scriptVersion: SCRIPT_VERSION,
    mainPageUrl: `${ScriptApp.getService().getUrl()}`,
  };
};
