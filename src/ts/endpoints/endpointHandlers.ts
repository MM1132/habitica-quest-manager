import { authGuard } from './endpointUtils';

export const layoutPageHandler = () => {
  return authGuard(() => {
    return HtmlService.createTemplateFromFile('pages/layout')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  });
};
