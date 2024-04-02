import { getGlobalPageData } from '../pages/globalPageData';
import { getAuthenticated } from '../services/properties/authPropertyService';

export const backToMainPage = (message: string) => {
  const { mainPageUrl } = getGlobalPageData();

  return HtmlService.createHtmlOutput(`
    <p>${message}</p>
    <a href="${mainPageUrl}">Click here to return to the main page</a>
  `);
};

export const authGuard = (endpoint: () => any) => {
  const authenticated = getAuthenticated();

  if (!authenticated) {
    return HtmlService.createTemplateFromFile('pages/setup')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return endpoint();
};
