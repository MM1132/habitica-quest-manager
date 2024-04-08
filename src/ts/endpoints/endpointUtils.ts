import { getAuthenticated } from '../services/properties/authPropertyService';
import { getGlobalPageData } from '../services/properties/globalPageData';

export const backToMainPage = (message: string) => {
  const { mainPageUrl } = getGlobalPageData();

  return HtmlService.createHtmlOutput(`
    <p>${message}</p>
    <a href="${mainPageUrl}">Click here to return to the main page</a>
  `);
};

export const authGuard = (endpoint: () => GoogleAppsScript.HTML.HtmlOutput) => {
  const authenticated = getAuthenticated();

  if (!authenticated) {
    return HtmlService.createTemplateFromFile('pages/setup')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return endpoint();
};
