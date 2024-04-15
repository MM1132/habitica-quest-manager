import { props_getAuthenticated } from '../services/properties/propsAuthService';
import { props_getConstantData } from '../services/properties/propsGlobalDataService';

export const backToMainPage = (message: string) => {
  const { baseUrl } = props_getConstantData();

  return HtmlService.createHtmlOutput(`
    <p>${message}</p>
    <a href="${baseUrl}">Click here to return to the main page</a>
  `);
};

export const authGuard = (endpoint: () => GoogleAppsScript.HTML.HtmlOutput) => {
  const authenticated = props_getAuthenticated();

  if (!authenticated) {
    return HtmlService.createTemplateFromFile('pages/setup')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return endpoint();
};
