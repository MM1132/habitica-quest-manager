import {
  getInviteHandler,
  getMainHandler,
  getSettingsHandler,
  getStartHandler,
  getTestHandler,
} from './endpoints/endpointHandlers';
import { Router } from './endpoints/router';

const router = new Router();
router.get('', getMainHandler);
router.get('start', getStartHandler);
router.get('invite', getInviteHandler);
router.get('test', getTestHandler);
router.get('settings', getSettingsHandler);

export function doGet(e: GoogleAppsScript.Events.DoGet) {
  return router.handleGet(e);
}

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  return router.handlePost(e);
}
