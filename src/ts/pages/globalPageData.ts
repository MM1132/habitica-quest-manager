import { SCRIPT_NAME, SCRIPT_VERSION } from '../services/local/constants';

export interface GlobalPageData {
  scriptName: string;
  scriptVersion: string;
  mainPageUrl: string;
  settingsPageUrl: string;
  setupPageUrl: string;
}

export const getGlobalPageData = (): GlobalPageData => {
  return {
    scriptName: SCRIPT_NAME,
    scriptVersion: SCRIPT_VERSION,
    mainPageUrl: `${ScriptApp.getService().getUrl()}`,
    settingsPageUrl: `${ScriptApp.getService().getUrl()}/settings`,
    setupPageUrl: `${ScriptApp.getService().getUrl()}/setup`,
  };
};
