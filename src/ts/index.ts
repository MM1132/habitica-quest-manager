import {
  getInviteHandler,
  getMainHandler,
  getPartyQuestsHandler,
  getSettingsHandler,
  getStartHandler,
  getTestHandler,
} from './endpoints/endpointHandlers';
import { Router } from './endpoints/router';

const router = new Router();

// Pages
router.get('', getMainHandler);
router.get('settings', getSettingsHandler);
router.get('test', getTestHandler);
router.get('party-quests', getPartyQuestsHandler);

// Actions
router.get('start', getStartHandler);
router.get('invite', getInviteHandler);

export function doGet(e: GoogleAppsScript.Events.DoGet) {
  return router.handleGet(e);
}

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  return router.handlePost(e);
}
