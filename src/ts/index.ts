import {
  getInviteHandler,
  getMainHandler,
  getSettingsHandler,
  getStartHandler,
  getTestHandler,
} from './endpoints/endpointHandlers';
import { backToMainPage } from './endpoints/endpointUtils';

export function doGet(e: GoogleAppsScript.Events.DoGet) {
  let { pathInfo } = e;
  pathInfo = pathInfo || '';

  const endpoints = {
    '': getMainHandler,
    start: getStartHandler,
    invite: getInviteHandler,
    test: getTestHandler,
    settings: getSettingsHandler,
  };

  if (!endpoints[pathInfo]) {
    return backToMainPage(`Invalid path: '${pathInfo}'`);
  }

  return endpoints[pathInfo](e);
}
